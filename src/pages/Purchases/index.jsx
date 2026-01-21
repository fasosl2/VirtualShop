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

  const handlePrintResumo = () => {
    if (productTotals.length > 0) {
      const printWindow = window.open("", "", "height=600,width=800");      
      const productList = productTotals.map(product => 
        `<li><strong>${product.title}:</strong> ${product.count} unidades</li>`
      ).join('');

      printWindow.document.body.innerHTML = `
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { font-size: 24px; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
          ul { list-style-type: none; padding: 0; }
          li { font-size: 16px; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
        </style>
        <h1>Resumo de Produtos</h1>
        <ul>${productList}</ul>
      `;
      printWindow.document.title = "Resumo de Produtos";
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  const handlePrintPurchases = () => {
    if (purchasesProcessed.length === 0) return;

    const printWindow = window.open("", "", "height=800,width=600");    
    const purchasesHTML = purchasesProcessed.map(purchase => {
      let cardHTML = `<div class="purchase-card">`;
      cardHTML += `<h2>Pedido: ${purchase._id}</h2>`;
      const { user } = purchase;
      if (user) cardHTML += `<p><b>Cliente:</b> ${user.name}</p>`;
      if (purchase.user?.phone) cardHTML += `<p><b>Telefone:</b> ${purchase.user.phone}</p>`;
      if (user?.address) {
        const { street, number, neighborhood, city, uf, referencePoint } = user.address;
        const addressParts = [street, number, neighborhood, city, uf].filter(Boolean);
        let fullAddress = addressParts.join(', ');
        if (referencePoint) fullAddress += ` - Ponto de Referência: ${referencePoint}`;
        cardHTML += `<p><b>Endereço:</b> ${fullAddress}</p>`;
      }
      if (user?.observations) cardHTML += `<p><b>Observações:</b> ${user.observations}</p>`;
      if (purchase.deliveryDate) cardHTML += `<p><b>Data de Entrega:</b> ${new Date(purchase.deliveryDate).toLocaleDateString()}</p>`;
      if (purchase.paymentMethod) cardHTML += `<p><b>Forma de Pagamento:</b> ${purchase.paymentMethod}</p>`;
      if (purchase.paymentStatus) cardHTML += `<p><b>Status do Pagamento:</b> ${purchase.paymentStatus}</p>`;
      if (purchase.deliveryStatus) cardHTML += `<p><b>Status da Entrega:</b> ${purchase.deliveryStatus}</p>`;
      cardHTML += `<p><b>Produtos:</b></p><ul>`;
      purchase.products?.forEach(product => { cardHTML += `<li>${product.productDetails?.title}: ${product.count} unidades</li>`; });
      cardHTML += `</ul></div>`;
      return cardHTML;
    }).join('');

    printWindow.document.body.innerHTML = `
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .purchase-card { 
          border: 1px solid #ccc; 
          border-radius: 8px; 
          padding: 15px; 
          margin-bottom: 20px; 
          page-break-inside: avoid;
        }
        h2 { font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 10px; }
        p { margin: 5px 0; font-size: 14px; }
        ul { list-style-type: none; padding-left: 15px; }
        li { margin-bottom: 5px; font-size: 12px; }
      </style>
      <h1>Lista de Pedidos</h1>
      ${purchasesHTML}
    `;
    printWindow.document.title = "Lista de Pedidos";
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

 const handleExportExcel = async () => {
    if (purchasesProcessed.length === 0) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Pedidos");

    // 1. Cabeçalhos
    const productTitles = Array.from(
      new Set(
        purchasesProcessed.flatMap(p => p.products.map(prod => prod.productDetails?.title).filter(Boolean))
      )
    ).sort();

    worksheet.columns = [
      { header: "Ponto de Referência", key: "referencePoint", width: 30 },
      { header: "Bairro", key: "neighborhood", width: 25 },
      { header: "Nome do Cliente", key: "customerName", width: 35 },
      ...productTitles.map(title => ({
        header: title,
        key: title,
        width: 10,
        style: { alignment: { horizontal: 'center' } }
      }))
    ];

    // 2. Adicionar dados
    const customerData = new Map();

    purchasesProcessed.forEach(purchase => {
      const user = purchase.user;
      if (!user?._id) return; // Pula pedidos sem cliente associado

      // Se o cliente ainda não está no mapa, inicializa seus dados
      if (!customerData.has(user._id)) {
        customerData.set(user._id, {
          referencePoint: user.address?.referencePoint || '',
          neighborhood: user.address?.neighborhood || '',
          customerName: user.name || '',
          products: new Map() // Usaremos um mapa para somar os produtos
        });
      }

      const customerRecord = customerData.get(user._id);

      // Itera sobre os produtos do pedido atual e soma as quantidades
      purchase.products.forEach(product => {
        if (product.productDetails?.title) {
          const currentCount = customerRecord.products.get(product.productDetails.title) || 0;
          customerRecord.products.set(product.productDetails.title, currentCount + product.count);
        }
      });
    });

    // 3. Adiciona os dados consolidados dos clientes na planilha
    customerData.forEach(data => {
      const rowData = {
        referencePoint: data.referencePoint,
        neighborhood: data.neighborhood,
        customerName: data.customerName,
      };
      data.products.forEach((count, title) => {
        rowData[title] = count;
      });
      worksheet.addRow(rowData);
    });

    // 4. Aplicar estilo de rotação no cabeçalho dos produtos
    const headerRow = worksheet.getRow(1);
    headerRow.height = 80; // Aumenta a altura da linha do cabeçalho
    worksheet.columns.forEach((column, index) => {
      if (index >= 3) { // A partir da 4ª coluna (produtos)
        headerRow.getCell(index + 1).alignment = { vertical: 'middle', horizontal: 'center', textRotation: 90, wrapText: true };
      }
    });

    // 5. Gerar e baixar o arquivo
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'relatorio_pedidos.xlsx';
    link.click();
  };

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
              <Button variant="info" onClick={handlePrintPurchases} className="w-100" disabled={purchasesProcessed.length === 0}>
                {/* <Image src={bag} className="m-1 mt-0" /> */}
                Imprimir Pedidos
              </Button>
              <Button variant="success" onClick={handleExportExcel} className="w-100" disabled={purchasesProcessed.length === 0}>
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
      (<Container className="mt-4 pt-4 border-top">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Resumo de Pedidos</h4>
          <Button variant="outline-secondary" onClick={handlePrintResumo} disabled={productTotals.length === 0}>
            Imprimir
          </Button>
        </div>
        {productTotals.length > 0 ? (
          <Row>
            {productTotals.map((product) => (
              <Col md={4} sm={6} xs={12} key={product._id} className="mb-2">
                <strong>{product.title}</strong> 
                <p>{product.count} unidades</p>
              </Col>
            ))}
          </Row>
        ) : (
          <p>Nenhum produto para exibir no resumo.</p>
        )}
      </Container>)}
      <Pagination {...{ page, pages, setPage, limit, setLimit, totalItems: state.purchases?.total }} />
    </ContentDiv>
  );
};
