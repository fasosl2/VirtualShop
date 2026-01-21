import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { Card } from "../../components/Card";
import { openModalCreatePurchaseType, savePurchasesSuccessType } from "../../storage/types";
import { Notification } from "../../components/Notification/Notification";
import { useEffect, useState, useMemo } from "react";
import {
  deletePurchaseAction,
  fetchPurchasesAction,
  savePurchasesAction,
} from "../../actions/purchasesAction";
import bag from "../../assets/bag.svg";
import utilService from "../../services/utilService";
import { ContentDiv } from "../../styles/global";
import { Pagination } from "../../components/Pagination";
import { Calendar } from "../../components/Calendar";
import { FloatingPillButton } from "../../components/FloatingPillButton";
import { ModalCreatePurchase } from "../../containers/ModalCreatePurchase";
import { openModalCreatePurchaseAction } from "../../actions/modalsActions";
import { Image } from "./styles";
import ExcelJS from 'exceljs';
import { handleExportExcel, handlePrintPurchases } from './purchaseUtils';
import { PurchaseSummary } from './PurchaseSummary';

export const Purchases = () => {
  const { state, dispatch } = useAppContext();
  const [showFeedback, setShowFeedback] = useState(false);
  // pagination params (sent to backend)
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState({
    period: "",
    productName: "",
    customerName: "",
    deliveryDay: "",
    isBase: "",
    paymentStatus: "",
    deliveryStatus: "",
  });
  const [apiFilters, setApiFilters] = useState({customerName: ["Master", "Gestor"].includes(state?.currentUser?.type) ? null : state?.currentUser?.name});
  const [showDateModal, setShowDateModal] = useState(false);
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);

  
  const purchasesArray = state.purchases?.list || [];

  const purchasesProcessed = purchasesArray.filter((purchase) =>
    ["Master", "Gestor"].includes(state?.currentUser?.type) ||
    state?.currentUser?._id === purchase?.user?._id
      ? purchase
      : false
  );

  const productTotals = useMemo(() => {
    if (!purchasesProcessed || purchasesProcessed.length === 0) {
      return [];
    }

    const totals = {};

    purchasesProcessed.forEach((purchase) => {
      purchase.subtotal = purchase?.products.reduce((total, item) => (Number(item?.productDetails?.price || 0)+total),0) || 0;
      purchase?.products?.forEach((product) => {
        if (product?.productDetails?._id) {
          if (totals[product.productDetails._id]) {
            totals[product.productDetails._id].count += product.count;
          } else {
            totals[product.productDetails._id] = { title: product.productDetails.title, count: product.count, _id: product.productDetails._id };
          }
        }
      });
    });
    return Object.values(totals).sort((a, b) => a.title.localeCompare(b.title));
  }, [purchasesProcessed]);

  useEffect(() => {
    fetchPurchasesAction(dispatch, { page, limit, ...apiFilters });
  }, [dispatch, page, limit, apiFilters]);

  useEffect(() => {
    setPages(state.purchases?.pages || 1);
  }, [state.purchases?.pages]);

  const handleShowFeedback = async () => {
    setShowFeedback(true);
    await utilService.sleep(5000);
    setShowFeedback(false);
  };

  const handleCreateOrUpdate = (purchase) => {
    dispatch(openModalCreatePurchaseAction(purchase));
  };

  const handleStatusChange = (purchaseId, field, value) => {
    savePurchasesAction(dispatch, { id: purchaseId, [field]: value });
  };

  useEffect(() => {
    if (state.type === savePurchasesSuccessType) {
      handleShowFeedback();
    }
  }, [state.type]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "period" && value !== "custom") {
      setCustomStartDate(null);
      setCustomEndDate(null);
    }
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    // Remove chaves com valores vazios para não poluir a URL
    const newFilters = Object.entries(filters).reduce((acc, [key, value]) => {      
      if (key === 'isBase' && value) {
        acc['recurrence.isBase'] = value;
      } else if (value && key !== 'period') {
        acc[key] = value;
      }
      return acc;
    }, {});

    if (filters.period === 'custom') {
      if (customStartDate) newFilters.startDate = customStartDate.toISOString();
      if (customEndDate) newFilters.endDate = customEndDate.toISOString();
    } else if (filters.period) {
      newFilters.period = filters.period;
    }

    setPage(1);
    setApiFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      period: "",
      productName: "",
      customerName: "",
      deliveryDay: "",
      isBase: "",
      paymentStatus: "",
      deliveryStatus: "",
    });
    setApiFilters({});
    setPage(1);
    setCustomStartDate(null);
    setCustomEndDate(null);
  };

  return (
    <ContentDiv>
    <ModalCreatePurchase open={state.mode === openModalCreatePurchaseType} />
      {showFeedback && (
        <Notification
          message="Alterado com sucesso"
          onClose={() => {
            setShowFeedback(false);
          }}
        />
      )}
      {["Master", "Gestor"].includes(state?.currentUser?.type) && (
        <FloatingPillButton label="+" onClick={handleCreateOrUpdate} />
      )}
      <Modal show={showDateModal} onHide={() => setShowDateModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Selecione o Período</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Data de Início</Form.Label>
                <Calendar
                  selectedDate={customStartDate}
                  setSelectedDate={setCustomStartDate}
                  selectsStart
                  endDate={customEndDate}
                  placeholderText="DD/MM/AAAA"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Data de Fim</Form.Label>
                <Calendar
                  selectedDate={customEndDate}
                  setSelectedDate={setCustomEndDate}
                  selectsEnd
                  startDate={customStartDate}
                  endDate={customEndDate}
                  minDate={customStartDate}
                  placeholderText="DD/MM/AAAA"
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Container>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleApplyFilters();
          }}
        >
          <Row className="align-items-end mb-3 gy-3">
            <Col md={2} sm={6}>
              <Form.Group>
                <Form.Label>Período de Entrega</Form.Label>
                <Form.Select name="period" value={filters.period} onChange={handleFilterChange}>
                  <option value="">Todos</option>
                  <option value="last">Semana Passada</option>
                  <option value="current">Semana Atual</option>
                  <option value="next">Próxima Semana</option>
                  <option value="custom">Personalizado</option>
                </Form.Select>
              </Form.Group>
            </Col>
            {filters.period === "custom" && (
              <Col md={2} sm={6}>
                <Button
                  onClick={() => setShowDateModal(true)}
                  className="w-100"
                  variant="outline-secondary"
                >
                  {customStartDate && customEndDate
                    ? `${customStartDate.toLocaleDateString()} - ${customEndDate.toLocaleDateString()}`
                    : "Selecionar Período"}
                </Button>
              </Col>
            )}
            {["Master", "Gestor"].includes(state?.currentUser?.type) &&
                (
              <Col md={2} sm={6}>
                <Form.Group>
                  <Form.Label>Nome do Cliente</Form.Label>
                  <Form.Control
                    type="text"
                    name="customerName"
                    value={filters.customerName}
                    onChange={handleFilterChange}
                    placeholder="Ex: João Silva"
                  />
                </Form.Group>
              </Col>
            )}
            {/* <Col md={2} sm={6}>
              <Form.Group>
                <Form.Label>Nome do Produto</Form.Label>
                <Form.Control
                  type="text"
                  name="productName"
                  value={filters.productName}
                  onChange={handleFilterChange}
                  placeholder="Ex: Cesta Básica"
                />
              </Form.Group>
            </Col> */}
            {["Master", "Gestor"].includes(state?.currentUser?.type) && (
              <Col md={2} sm={6}>
                <Form.Group>
                  <Form.Label>Pedido Recorrente</Form.Label>
                  <Form.Select
                    name="isBase"
                    value={filters.isBase}
                    onChange={handleFilterChange}
                  >
                    <option value="">Todos</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            )}
            {["Master", "Gestor"].includes(state?.currentUser?.type) && (
              <Col md={2} sm={6}>
                <Form.Group>
                  <Form.Label>Status do Pagamento</Form.Label>
                  <Form.Select
                    name="paymentStatus"
                    value={filters.paymentStatus}
                    onChange={handleFilterChange}
                  >
                    <option value="">Todos</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Pago">Pago</option>
                    <option value="Cancelado">Cancelado</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            )}
            {["Master", "Gestor"].includes(state?.currentUser?.type) && (
              <Col md={2} sm={6}>
                <Form.Group>
                  <Form.Label>Status da Entrega</Form.Label>
                  <Form.Select
                    name="deliveryStatus"
                    value={filters.deliveryStatus}
                    onChange={handleFilterChange}
                  >
                    <option value="">Todos</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Em preparação">Em preparação</option>
                    <option value="Em rota de entrega">Em rota de entrega</option>
                    <option value="Entregue">Entregue</option>
                    <option value="Cancelado">Cancelado</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            )}
            
            {["Master", "Gestor"].includes(state?.currentUser?.type) &&
                (
              <Col md={2} sm={6}>
                <Form.Group>
                  <Form.Label>Dia de Entrega</Form.Label>
                  <Form.Select name="deliveryDay" value={filters.deliveryDay} onChange={handleFilterChange}>
                    <option value="">Todos</option>
                    <option value="Domingo">Domingo</option>
                    <option value="Segunda-feira">Segunda-feira</option>
                    <option value="Terça-feira">Terça-feira</option>
                    <option value="Quarta-feira">Quarta-feira</option>
                    <option value="Quinta-feira">Quinta-feira</option>
                    <option value="Sexta-feira">Sexta-feira</option>
                    <option value="Sábado">Sábado</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            )}
            <Col md={3} sm={12} className="d-flex gap-2 ms-auto">
              <Button type="submit" className="w-100">Filtrar</Button>
              <Button variant="secondary" onClick={handleClearFilters} className="w-100">Limpar</Button>
              <Button variant="info" onClick={() => handlePrintPurchases(purchasesProcessed)} className="w-100" disabled={purchasesProcessed.length === 0}>
                {/* <Image src={bag} className="m-1 mt-0" /> */}
                Imprimir Pedidos
              </Button>
              <Button variant="success" onClick={() => handleExportExcel(purchasesProcessed)} className="w-100" disabled={purchasesProcessed.length === 0}>
                Exportar Romaneio
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <Container fluid>
        <Row>
          {purchasesProcessed.map((purchase) => (
            <Col key={purchase._id} xs={13} md={4} style={{ marginTop: "1em" }}>
              <Card {...(
                () => {
                  const { user } = purchase;                  
                  const { street, number, neighborhood, city, uf, referencePoint } = user?.address || {};
                  const addressParts = [street, number, neighborhood, city, uf].filter(Boolean);
                  let fullAddress = addressParts.join(', ');
                  if (referencePoint) fullAddress += ` - Ponto de Referência: ${referencePoint}`;

                  return {
                  ...purchase,
                  subTitle: (
                    <div>
                      <p>Pedido: {purchase?._id}</p>
                      {user && (
                        <p>
                          <b>Cliente: {user.name}</b>
                        </p>
                      )}
                      {purchase?.user?.phone && (
                        <p>Telefone: {purchase?.user?.phone}</p>
                      )}
                      {fullAddress && (
                        <p>Endereço: {fullAddress}</p>
                      )}
                      {user?.observations && (
                        <p>Observações: {user.observations}</p>
                      )}
                      {purchase?.deliveryDate && (
                        <p>Data de Entrega: {new Date(purchase?.deliveryDate).toLocaleDateString()}</p>
                      )}
                      {purchase?.paymentMethod && (
                        <p><b>Forma de Pagamento:</b> {purchase.paymentMethod}</p>
                      )}
                      <p>
                        <b>Subtotal:</b> {utilService.formatCurrency(purchase.subtotal || 0)}
                      </p>
                      {purchase.discount > 0 && (
                        <p className="text-danger">
                          <b>Desconto:</b> - {utilService.formatCurrency(purchase.discount)}
                        </p>
                      )}
                      <p>
                        <b>Total:</b> {utilService.formatCurrency((purchase.subtotal || 0) - (purchase.discount || 0))}
                      </p>
                      <Row className="mt-2">
                        <Col>
                          <Form.Group>
                            <Form.Label className="small">Pagamento</Form.Label>
                            <Form.Select
                              size="sm"
                              value={purchase.paymentStatus}
                              onChange={(e) => handleStatusChange(purchase._id, 'paymentStatus', e.target.value)}
                            >
                              <option value="Pendente">Pendente</option>
                              <option value="Pago">Pago</option>
                              <option value="Cancelado">Cancelado</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group>
                            <Form.Label className="small">Entrega</Form.Label>
                            <Form.Select
                              size="sm"
                              value={purchase.deliveryStatus}
                              onChange={(e) => handleStatusChange(purchase._id, 'deliveryStatus', e.target.value)}
                            >
                              <option value="Pendente">Pendente</option>
                              <option value="Em preparação">Em preparação</option>
                              <option value="Em rota de entrega">Em rota de entrega</option>
                              <option value="Entregue">Entregue</option>
                              <option value="Cancelado">Cancelado</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <p>
                        Produtos:
                        <br />
                      </p>
                      <ul>
                        {purchase?.products?.map((ele) => (
                          <li key={ele._id}>
                            {ele.productDetails?.title} 
                            <br />
                            Quantidade: {ele.count}
                            <br />
                            Valor: {utilService.formatCurrency(ele?.count * Number(ele.productDetails?.price))}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ),
                  controls: [
                    {
                      label: "Editar",
                      loadingLabel: "Editando",
                      variant: "warning",
                      onClick: async () => {
                        handleCreateOrUpdate(purchase);
                      },
                    },
                    {
                      label: "Excluir",
                      loadingLabel: "Excluindo",
                      variant: "danger",
                      onClick: async () => {
                        await deletePurchaseAction(dispatch, purchase._id);
                      },
                    },
                  ],
                }
              })()}
            />
            </Col>
          ))}
        </Row>
      </Container>
      {["Master", "Gestor"].includes(state?.currentUser?.type) &&
        <PurchaseSummary productTotals={productTotals} />
      }
      <Pagination {...{ page, pages, setPage, limit, setLimit, totalItems: state.purchases?.total }} />
    </ContentDiv>
  );
};
