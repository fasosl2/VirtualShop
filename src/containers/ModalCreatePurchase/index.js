import { useEffect, useState, useMemo } from "react";
import { Modal } from "../../components/Modal/Modal";
import { Form, Row, Col, Button, Dropdown, InputGroup, ListGroup } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { closeModalsAction } from "../../actions/modalsActions";
import {
  savePurchasesInitType,
  savePurchasesSuccessType,
  closeModalsType,
} from "../../storage/types";
import { savePurchasesAction } from "../../actions/purchasesAction";
import { fetchUsersAction } from "../../actions/userActions";
import { fetchProductsAction } from "../../actions/productActions";
import { Calendar } from "../../components/Calendar";
import { Pagination } from "../../components/Pagination";
import { CountButtonGroup } from "../../components/CountButtonGroup";

export const ModalCreatePurchase = ({ open }) => {
  const { state, dispatch } = useAppContext();
  const { users, products: productsData, activePurchase } = state;

  const [purchaseData, setPurchaseData] = useState({
    user: "",
    deliveryDate: null,
    products: [],
    paymentStatus: 'Pendente',
    deliveryStatus: 'Pendente',
    paymentMethod: 'A Combinar',
  });

  const [customerFilter, setCustomerFilter] = useState('');
  // Product search and pagination
  const [productSearch, setProductSearch] = useState('');
  const [apiProductFilter, setApiProductFilter] = useState('');
  const [productPage, setProductPage] = useState(1);
  const [productLimit, setProductLimit] = useState(5); // A smaller limit for the modal view

  const deliveryDayOfWeek = useMemo(() => {
    if (!purchaseData.deliveryDate) return '';
    const days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    // Garante que estamos trabalhando com um objeto Date
    const dateObject = new Date(purchaseData.deliveryDate);
    const dayIndex = dateObject.getDay();
    return days[dayIndex];
  }, [purchaseData.deliveryDate]);
  const isEditing = useMemo(() => !!activePurchase?._id, [activePurchase]);

  const selectedCustomerName = useMemo(() => {
    if (!purchaseData.user || !users?.list) return "Selecione um cliente";
    return users.list.find(u => u._id === purchaseData.user)?.name || "Selecione um cliente";
  }, [purchaseData.user, users?.list]);

  const filteredUsers = useMemo(() => {
    if (!users?.list) return [];
    if (!customerFilter) return users.list;
    return users.list.filter(user =>
      user.name.toLowerCase().includes(customerFilter.toLowerCase())
    );
  }, [users?.list, customerFilter]);

  const isFormInvalid = useMemo(() => {
    return (
      !purchaseData.user ||
      !purchaseData.deliveryDate ||
      purchaseData.products.length === 0
    );
  }, [purchaseData]);

  useEffect(() => {
    // Fetch users and products if not available
    if (open) {
      if (!users?.list?.length) {
        fetchUsersAction(dispatch, { limit: 0 });
      }
    }

    // Populate form when editing
    if (isEditing) {
      setPurchaseData({
        user: activePurchase.user?._id || "",
        deliveryDate: activePurchase.deliveryDate
          ? new Date(activePurchase.deliveryDate)
          : null,
        products:
          activePurchase.products?.map((p) => ({
            id: p.id._id,
            count: p.count,
            title: p.id.title,
            image: p.id.image,
            price: p.id.price,
          })) || [],
        paymentStatus: activePurchase.paymentStatus || 'Pendente',
        deliveryStatus: activePurchase.deliveryStatus || 'Pendente',
        paymentMethod: activePurchase.paymentMethod || 'A Combinar',
      });
    }

    // Reset form on close
    if (state.type === closeModalsType) {
      setPurchaseData({ user: "", deliveryDate: null, products: [] });
      setCustomerFilter('');
      setProductSearch('');
      setApiProductFilter('');
      setProductPage(1);
      setProductLimit(5);
    }
  }, [open, isEditing, activePurchase, state.type, dispatch, users?.list?.length]);

  // Fetch products when modal is open, page or filter changes
  useEffect(() => {
    if (open) {
      const fetchOpts = {
        page: productPage,
        limit: productLimit,
      };
      if (apiProductFilter) {
        fetchOpts.title = apiProductFilter;
      }
      fetchProductsAction(dispatch, fetchOpts);
    }
  }, [open, productPage, apiProductFilter, dispatch, productLimit]);
  
  useEffect(() => {
    if (state.type === savePurchasesSuccessType) {
      dispatch(closeModalsAction());
    }
  }, [state.type, dispatch]);

  const handleCustomerSelect = (userId) => {
    const selectedUser = users?.list?.find(u => u._id === userId);
    let newDeliveryDate = null;

    if (selectedUser?.deliveryDay) {
      const dayMap = {
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
        if (daysToAdd === 0) daysToAdd = 7; // Sempre agenda para o próximo dia que ocorrer
        const nextDate = new Date(currentDate);
        newDeliveryDate = new Date(nextDate.setDate(nextDate.getDate() + daysToAdd));
      }
    }
    setPurchaseData(prev => ({ ...prev, user: userId, deliveryDate: newDeliveryDate }));
  };

  const handleProductCountChange = ({ element, negativeValue }) => {
    // This logic reads the state at render time, making it resilient
    // to a quick double-call event. Both calls will operate on the
    // same initial state, preventing a double increment/decrement.
    const { products, ...restOfPurchaseData } = purchaseData;
    const existingProduct = products.find((p) => p.id === element.id);

    let newProducts;

    if (existingProduct) {
      const newCount = existingProduct.count + (negativeValue ? -1 : 1);
      if (newCount <= 0) {
        // Remove product using filter for immutability
        newProducts = products.filter((p) => p.id !== element.id);
      } else {
        // Update product count using map for immutability
        newProducts = products.map((p) =>
          p.id === element.id ? { ...p, count: newCount } : p
        );
      }
    } else if (!negativeValue) {
      // Add new product
      newProducts = [...products, { ...element, count: 1 }];
    } else {
      newProducts = products; // No change
    }
    setPurchaseData({ ...restOfPurchaseData, products: newProducts });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...purchaseData,
      // Garante que o backend receba apenas os campos necessários
      products: purchaseData.products.map(({ id, count }) => ({ id, count })),
    };
    if (isEditing) {
      payload.id = activePurchase._id;
    }
    savePurchasesAction(dispatch, payload);
  };

  const handleProductSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Only trigger API call if the search term changes
      if (productSearch !== apiProductFilter) {
        setApiProductFilter(productSearch);
        setProductPage(1); // Reset to first page on new search
      }
    }
  };

  const handleLimitChange = (newLimit) => {
    setProductLimit(newLimit);
    setProductPage(1);
  };

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
                    onClick={() => handleCustomerSelect(user._id)}
                    active={purchaseData.user === user._id}
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
                onChange={(e) => setPurchaseData(prev => ({ ...prev, paymentStatus: e.target.value }))}
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
                onChange={(e) => setPurchaseData(prev => ({ ...prev, deliveryStatus: e.target.value }))}
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
                onChange={(e) => setPurchaseData(prev => ({ ...prev, paymentMethod: e.target.value }))}
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
                  <ListGroup.Item key={productInPurchase.id} className="d-flex justify-content-between align-items-center">
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
              {productsData?.list?.map(product => {
                const isInPurchase = purchaseData.products.some(p => p.id === product.id);
                return (
                  <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center">
                    <span className="me-2">{product.title}</span>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleProductCountChange({ element: product, negativeValue: false })}
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
};
