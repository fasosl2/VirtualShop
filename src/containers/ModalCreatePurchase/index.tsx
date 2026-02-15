import { useEffect, useState, useMemo } from "react";
import type { ChangeEvent } from "react";
import { Modal } from "../../components/Modal";
import { Form, Row, Col, Button, Dropdown, InputGroup, ListGroup, FormControl } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { closeModalsAction } from "../../actions/modalsActions";
import {
  savePurchasesInitType,
  savePurchasesSuccessType,
  closeModalsType,
} from "../../storage/actionConstants";
import { savePurchasesAction } from "../../actions/purchasesAction";
import { fetchUsersAction } from "../../actions/userActions";
import { fetchProductsAction } from "../../actions/productActions";
import { getPurchases } from "../../services/purchaseServices";
import { Calendar } from "../../components/Calendar";
import { Pagination } from "../../components/Pagination";
import utilService from "../../services/utilService";
import { CountButtonGroup } from "../../components/CountButtonGroup";
import type { IPurchase } from "../../interfaces/Purchase";
import type { IUser } from "../../interfaces/User";
import type { IProduct } from "../../interfaces/Product";
import type { IModal } from "../../components/Modal/type";

export const ModalCreatePurchase = ({ open }: IModal) => {
  const { state, dispatch } = useAppContext();
  const { users, products: productsData, activePurchase } = state;

  const [purchaseData, setPurchaseData] = useState<IPurchase>({
    user: {} as IUser,
    deliveryDate: null,
    products: [],
    paymentStatus: 'Pendente',
    deliveryStatus: 'Pendente',
    paymentMethod: 'A Combinar',
    discount: 0,
    observations: '',
    recurrence: {
      isBase: 'Não',
      baseID: ''
    },
  });

  const [customerFilter, setCustomerFilter] = useState('');
  // Product search and pagination
  const [productSearch, setProductSearch] = useState('');
  const [apiProductFilter, setApiProductFilter] = useState('');
  const [productPage, setProductPage] = useState(1);
  const [productLimit, setProductLimit] = useState(5); // A smaller limit for the modal view
  const [basePurchases, setBasePurchases] = useState<IPurchase[]>([]);

  // const baseProducts = useMemo(() => {
  //   if (!productsData?.list) return [];
  //   return productsData.list.filter((p:IProduct) => p.recurrence?.isBase === 'Sim');
  // }, [productsData?.list]);

  const deliveryDayOfWeek = useMemo(() => {
    if (!purchaseData.deliveryDate) return '';
    const days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const dateObject = new Date(purchaseData.deliveryDate);
    const dayIndex = dateObject.getDay();
    return days[dayIndex];
  }, [purchaseData.deliveryDate]);

  const isEditing = useMemo(() => !!activePurchase?._id, [activePurchase]);

  const selectedCustomerName = useMemo(() => {
    if (!purchaseData.user || !users?.list) return "Selecione um cliente";
    return users.list.find((u:IUser) => u._id === purchaseData.user._id)?.name || "Selecione um cliente";
  }, [purchaseData.user, users?.list]);

  const filteredUsers = useMemo(() => {
    if (!users?.list) return [];
    if (!customerFilter) return users.list;
    return users.list.filter((user:IUser) =>
      user.name.toLowerCase().includes(customerFilter.toLowerCase())
    );
  }, [users?.list, customerFilter]);

  const totalPrice = useMemo(() => {
    return purchaseData.products.reduce((acc, product) => {
      const price = parseFloat(String(product?.price || 0));
      return acc + (price * product.count);
    }, 0);
  }, [purchaseData.products]);

  const finalPrice = useMemo(() => {
    const discount = Number(purchaseData.discount) || 0;
    return totalPrice - discount;
  }, [totalPrice, purchaseData.discount]);

  const isFormInvalid = useMemo(() => {
    return (
      !purchaseData.user ||
      !purchaseData.deliveryDate ||
      purchaseData.products.length === 0
    );
  }, [purchaseData]);

  useEffect(() => {
    fetchUsersAction(dispatch, { limit: 0 });
    if (isEditing) {
      setPurchaseData({
        user: activePurchase?.user,
        deliveryDate: activePurchase.deliveryDate
          ? new Date(activePurchase.deliveryDate)
          : null,
        products: activePurchase.products?.map((p) => 
          ({...p.productDetails, count: p.count })) || [],
        paymentStatus: activePurchase.paymentStatus || 'Pendente',
        deliveryStatus: activePurchase.deliveryStatus || 'Pendente',
        paymentMethod: activePurchase.paymentMethod || 'A Combinar',
        discount: activePurchase.discount || 0,
        observations: activePurchase.observations || '',
        recurrence: {
          isBase: activePurchase.recurrence?.isBase || 'Não',
          baseID: activePurchase.recurrence?.baseID || ''
        }
      });
    } else if (state.type === closeModalsType) {
      setPurchaseData({
        user: {} as IUser,
        deliveryDate: null,
        products: [],
        paymentStatus: 'Pendente',
        deliveryStatus: 'Pendente',
        paymentMethod: 'A Combinar',
        discount: 0,
        observations: '',
        recurrence: {
          isBase: 'Não',
          baseID: ''
        },
      });
      setCustomerFilter('');
      setProductSearch('');
      setApiProductFilter('');
      setProductPage(1);
      setBasePurchases([]);
      setProductLimit(5);
    }
  }, [open, isEditing, activePurchase, dispatch]);

  useEffect(() => {
    if (open) {
      const fetchOpts: { page: number, limit: number, title?: string } = {
        page: productPage,
        limit: productLimit,
      };
      if (apiProductFilter) {
        fetchOpts.title = apiProductFilter;
      }
      fetchProductsAction(dispatch, fetchOpts);

      const fetchBasePurchases = async () => {
        const result = await getPurchases({ 'recurrence.isBase': 'Sim', limit: 0 });
        if (result?.list) {
          setBasePurchases(result.list);
        }
      };
      fetchBasePurchases();
    }
  }, [open, productPage, apiProductFilter, dispatch, productLimit]);

  useEffect(() => {
    if (state.type === savePurchasesSuccessType) {
      dispatch(closeModalsAction());
    }
  }, [state.type, dispatch]);

  const handleCustomerSelect = (user: IUser) => {
    const selectedUser = users?.list?.find((u:IUser) => u._id === user._id);
    let newDeliveryDate: Date | null = null;

    if (selectedUser?.deliveryDay) {
      const dayMap: { [key: string]: number } = {
        Domingo: 0,
        "Segunda-feira": 1,
        "Terça-feira": 2,
        "Quarta-feira": 3,
        "Quinta-feira": 4,
        "Sexta-feira": 5,
        Sábado: 6,
      };
      const targetDayIndex = dayMap[selectedUser.deliveryDay];

      if (typeof targetDayIndex === "number") {
        const currentDate = new Date();
        const currentDay = currentDate.getDay();
        let daysToAdd = (targetDayIndex - currentDay + 7) % 7;
        if (daysToAdd === 0) daysToAdd = 7;
        const nextDate = new Date(currentDate);
        newDeliveryDate = new Date(nextDate.setDate(nextDate.getDate() + daysToAdd));
      }
    }
    setPurchaseData(prev => ({ ...prev, user: user, deliveryDate: newDeliveryDate }));
  };

  const handleProductCountChange = ({ element, negativeValue = 0}: { element: IProduct, negativeValue: number}) => {
    const { products, ...restOfPurchaseData } = purchaseData;
    const existingProduct = products.find((p) => p._id === element._id);

    let newProducts;

    if (existingProduct) {
      const newCount = existingProduct.count + (negativeValue ? -1 : 1);
      if (newCount <= 0) {
        newProducts = products.filter((p) => p._id !== element._id);
      } else {
        newProducts = products.map((p) =>
          p._id === element._id ? { ...p, count: newCount } : p
        );
      }
    } else if (!negativeValue) {
      newProducts = [...products, { ...element, count: 1 }];
    } else {
      newProducts = products;
    }
    setPurchaseData({ ...restOfPurchaseData, products: newProducts });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      ...purchaseData,
      products: purchaseData.products.map(({ _id, count }) => ({ id: _id, count })),
      discount: Number(purchaseData.discount) || 0,
      observations: purchaseData.observations || '',
    };
    if (isEditing) {
      (payload as any)._id = activePurchase._id;
    }
    savePurchasesAction(dispatch, payload as any);
  };

  const handleProductSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (productSearch !== apiProductFilter) {
        setApiProductFilter(productSearch);
        setProductPage(1);
      }
    }
  };

  const handleLimitChange = (newLimit: number) => {
    setProductLimit(newLimit);
    setProductPage(1);
  };
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPurchaseData(prev => ({ ...prev, [name]: value }));
  }

  const handleRecurrenceChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPurchaseData(prev => ({ ...prev, recurrence: { ...prev.recurrence, [name]: value } }));
  }

  return (
    <Modal
      title={isEditing ? "Editar Pedido" : "Criar Pedido"}
      open={open}
      controls={[
        {
          label: "Salvar",
          loadingLabel: "Salvando",
          loading: state.type === savePurchasesInitType,
          variant: "secondary",
          type: "submit",
          form: "form-create-purchase",
          disabled: isFormInvalid,
        },
      ]}
    >
      <Form onSubmit={handleSubmit} id="form-create-purchase">
        <Form.Group className="mb-3">
          <Form.Label>Cliente</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-customer-filter" className="w-100 text-start">
              {selectedCustomerName}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ width: '100%' }}>
              <div className="p-2">
                <Form.Control
                  autoFocus
                  placeholder="Digite para buscar..."
                  onChange={(e) => setCustomerFilter(e.target.value)}
                  value={customerFilter}
                />
              </div>
              <Dropdown.Divider />
              <div style={{maxHeight: '200px', overflowY: 'auto'}}>
                {filteredUsers.map((user) => (
                  <Dropdown.Item 
                    key={user._id} 
                    onClick={() => handleCustomerSelect(user)}
                    active={purchaseData.user._id === user._id}
                  >
                    {user.name}
                  </Dropdown.Item>
                ))}
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Data de Entrega: </Form.Label>
          <Calendar
            selectedDate={purchaseData.deliveryDate}
            setSelectedDate={(date) => setPurchaseData(prev => ({ ...prev, deliveryDate: date }))}
            placeholderText="DD/MM/AAAA"
          /><Form.Label> ({deliveryDayOfWeek})</Form.Label>
        </Form.Group>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Status do Pagamento</Form.Label>
              <Form.Select
                name="paymentStatus"
                value={purchaseData.paymentStatus}
                onChange={handleInputChange}
              >
                <option value="Pendente">Pendente</option>
                <option value="Pago">Pago</option>
                <option value="Cancelado">Cancelado</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Status da Entrega</Form.Label>
              <Form.Select
                name="deliveryStatus"
                value={purchaseData.deliveryStatus}
                onChange={handleInputChange}
              >
                <option value="Pendente">Pendente</option>
                <option value="Em preparação">Em preparação</option>
                <option value="Em rota de entrega">Em rota de entrega</option>
                <option value="Entregue">Entregue</option>
                <option value="Cancelado">Cancelado</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Forma de Pagamento</Form.Label>
              <Form.Select
                name="paymentMethod"
                value={purchaseData.paymentMethod}
                onChange={handleInputChange}
              >
                <option value="A Combinar">A Combinar</option>
                <option value="Pix">Pix</option>
                <option value="Cartão de Crédito">Cartão de Crédito</option>
                <option value="Cartão de Débito">Cartão de Débito</option>
                <option value="Dinheiro">Dinheiro</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        
        <Row>
          <Col md={6}>
            <h5>Produtos no Pedido</h5>
            <div style={{maxHeight: '400px', overflowY: 'auto'}}>
              <ListGroup variant="flush">
                {purchaseData.products.map((productInPurchase) => (
                  <ListGroup.Item key={productInPurchase._id} className="d-flex justify-content-between align-items-center">
                    <span>{productInPurchase.title}</span>
                    <CountButtonGroup
                      total={productInPurchase.count}
                      element={productInPurchase}
                      onClick={handleProductCountChange}
                    />
                  </ListGroup.Item>
                ))}
                 {purchaseData.products.length === 0 && 
                  <p className="text-muted p-2">Nenhum produto adicionado.</p>}
              </ListGroup>
            </div>
            <hr />
            <div>
              <p className="d-flex justify-content-between">
                <span>Subtotal:</span>
                <span>{utilService.formatCurrency(totalPrice)}</span>
              </p>
              <Form.Group as={Row} className="mb-2 align-items-center">
                <Form.Label column sm="5" className="text-danger">Desconto (R$):</Form.Label>
                <Col sm="7">
                  <FormControl type="number" name="discount" value={purchaseData.discount} onChange={handleInputChange} placeholder="0,00" />
                </Col>
              </Form.Group>
              <h5 className="d-flex justify-content-between">
                <span>Total:</span>
                <span>{utilService.formatCurrency(finalPrice)}</span>
              </h5>
              <br />
              <Form.Control
                as="textarea"
                rows={3}
                name="observations"
                placeholder="Observações"
                value={purchaseData?.observations}
                onChange={handleInputChange}
              />
              <Row className="mt-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>É a base de um pedido recorrente?</Form.Label>
                    <div>
                      <Form.Check
                        inline
                        disabled={!!purchaseData?.recurrence?.baseID?.length}
                        type="radio"
                        label="Sim"
                        name="isBase"
                        value="Sim"
                        checked={purchaseData?.recurrence?.isBase === 'Sim'}
                        onChange={handleRecurrenceChange}
                      />
                      <Form.Check
                        inline
                        type="radio"
                        label="Não"
                        name="isBase"
                        value="Não"
                        checked={purchaseData?.recurrence?.isBase === 'Não'}
                        onChange={handleRecurrenceChange}
                      />
                    </div>
                  </Form.Group>
                </Col>
                {purchaseData?.recurrence?.isBase !== 'Sim' && (
                  <Col md={8}>
                    <Form.Group>
                      <Form.Label>Pedido base</Form.Label>
                      <Form.Select
                        disabled={true}
                        name="baseID"
                        value={purchaseData?.recurrence?.baseID}
                        onChange={handleRecurrenceChange}
                      >
                        <option value="">Nenhum</option>
                        {basePurchases.map(p => (
                          <option key={p._id} value={p._id}>Pedido #{p._id} - {(p.user as IUser)?.name}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                )}
              </Row>
            </div>
          </Col>
          <Col md={6}>
            <h5 className="mb-2">Selecione Produtos</h5>
            <InputGroup className="mb-2">
              <Form.Control
                type="text"
                placeholder="Buscar e pressionar Enter..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                onKeyDown={handleProductSearch}
              />
            </InputGroup>
            <ListGroup style={{maxHeight: '300px', overflowY: 'auto'}}>
              {productsData?.list?.map((product:IProduct) => {
                const isInPurchase = purchaseData.products.some(p => p._id === product._id);
                return (
                  <ListGroup.Item key={product._id} className="d-flex justify-content-between align-items-center">
                    <span className="me-2">{product.title}</span>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleProductCountChange({ element: product, negativeValue: 0 })}
                      disabled={isInPurchase}
                    >+</Button>
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
            <Pagination
              page={productPage}
              pages={productsData?.pages || 1}
              setPage={setProductPage}
              limit={productLimit}
              setLimit={handleLimitChange}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
  }