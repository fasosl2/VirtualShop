import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { ProductCard } from "../../components/ProductCard";
import {
  openModalCreateProductType,
  openModalBuyProductType,
  openModalSaveItemsType,
  saveProductsSuccessType,
  openModalCreateCategoriesType,
} from "../../storage/types";
import { Notification } from "../../components/Notification/Notification";
import { useEffect, useState } from "react";
import {
  deleteProductAction,
  deleteProductsFromChartAction,
  saveProductsInChartAction,
  fetchProductsAction,
} from "../../actions/productActions";
import { fetchCategoriesAction } from "../../actions/categoriesActions";
import { fetchChartsAction } from "../../actions/chartActions";
import {
  openModalCreateProductAction,
  openModalBuyProductAction,
} from "../../actions/modalsActions";
import { ModalCreateProduct } from "../../containers/ModalCreateProduct";
import { FloatingPillButton } from "../../components/FloatingPillButton";
import utilService from "../../services/utilService";
import { ProductCol, ProductContainer } from "./styles";
import { ModalCreateSchedule } from "../../containers/ModalBuyProduct";

import { ContentDiv } from "../../styles/global";
import { Pagination } from "../../components/Pagination";
import { ModalCreateCategories } from "../../containers/ModalCreateCategories";

export const Products = () => {
  const { state, dispatch } = useAppContext();
  const [showFeedback, setShowFeedback] = useState(false);
  // pagination
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    categories: "",
    title: "",
  });
  const [pages, setPages] = useState(state.products?.pages);  
  const [limit, setLimit] = useState(10);  

  // expect paginated response: state.products = { list, total, page, pages }
  const productsArray = state.products?.list || [];
  const productsTotalized = productsArray.map((product) => ({
    ...product,
    total: state.chart?.products?.find((chart) => chart.id === product.id)
      ?.count,
  }));
  const [apiFilters, setApiFilters] = useState({});

  useEffect(() => {
    fetchProductsAction(dispatch, { page, limit,...apiFilters });
    fetchChartsAction(dispatch);
  }, [dispatch, pages, page, limit, apiFilters]);


  useEffect(() => {
    fetchCategoriesAction(dispatch);
  }, [dispatch]);
  


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
const handleClearFilters = () => {
    setFilters({
    categories: "",
    title: "",
  });
    setApiFilters({});
    setPage(1);
  };
  const handleApplyFilters = () => {
    const newFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value) {        
        acc[key] = value;
      }
      return acc;
    }, {});
    setPage(1);
    setApiFilters(newFilters);
    fetchProductsAction(dispatch, { page: 1, limit, ...newFilters });
  };

  const handleCategory = (e) => {
    e.preventDefault();

    const name= e.target.name;
    const value = e.target.value
    setApiFilters((prev) => ({
      ...prev,      [name]: value,
    }));
  };

  const handleShowFeedback = async () => {
    setShowFeedback(true);
    await utilService.sleep(5000);
    setShowFeedback(false);
  };

  const handleChartClick = async ({
    element,
    negativeValue,
    setItemsLoading,
    field,
  }) => {
    setItemsLoading((prevState) => ({ ...prevState, [field]: true }));
    dispatch(
      negativeValue
        ? await deleteProductsFromChartAction(dispatch, element, negativeValue)
        : await saveProductsInChartAction(dispatch, element)
    );
    setItemsLoading((prevState) => ({ ...prevState, [field]: false }));
  };

  const handleCreateOrUpdate = (product) => {
    dispatch(openModalCreateProductAction(product));
  };

  const handleBuyProduct = async (product) => {
    //await saveProductsInChartAction(dispatch, product);
    dispatch(openModalBuyProductAction(product));
  };

  useEffect(() => {
    if (state.type === saveProductsSuccessType) {
      handleShowFeedback();
    }
    setPages(state.products?.pages || 1);
  }, [state.type]);

  return (
    <ContentDiv>
      <ModalCreateSchedule open={state.mode === openModalBuyProductType} />
      {/*<ModalCreateCategories open={state.mode === openModalCreateCategoriesType} />*/}
      <ModalCreateProduct open={state.mode === openModalCreateProductType} />
      <ModalCreateCategories open={state.mode === openModalCreateCategoriesType} />
      {/* <ModalSaveItems open={state.mode === openModalSaveItemsType} /> */}
      {["Master", "Gestor"].includes(state?.currentUser?.type) && (
        <FloatingPillButton label="+" onClick={handleCreateOrUpdate} />
      )}

      {showFeedback && (
        <Notification
          message="Criado com sucesso"
          onClose={() => {
            setShowFeedback(false);
          }}
        />
      )}
       <Container>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleApplyFilters();
          }}
        >
          <Row className="align-items-end mb-3 gy-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label>Categoria</Form.Label>
                <Form.Select name="categories" value={filters.categories} onChange={handleFilterChange}>
                  <option value={null}>Todos</option>
                  {state?.categories?.list?.map(category => 
                    (<option key={category._id} value={category._id}>{category.name}</option>))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={filters.title}
                  onChange={handleFilterChange}
                  placeholder="Ex: Cesta básica"
                />
              </Form.Group>
            </Col>
            <Col md={3} className="d-flex gap-2 ms-auto">
              <Button type="submit" className="w-100">
                Filtrar
              </Button>
              <Button
                variant="secondary"
                onClick={handleClearFilters}
                className="w-100">
                  Limpar
              </Button>
            </Col>
          </Row>
        </Form>
      </Container><ProductContainer fluid>
        <Row>
          {productsTotalized.map((product) => (
            <ProductCol
              key={product.id}
              xl={6}
              xs={12}
              style={{ marginTop: "1em" }}
            >
              {console.log(product)}
              <ProductCard
                {...{
                  ...product,
                  controls: (() => {
                    let controls = [
                      {
                        label: "Editar",
                        loadingLabel: "Editando",
                        variant: "warning",
                        onClick: async () => {
                          handleCreateOrUpdate(product);
                        },
                      },
                      {
                        label: "Excluir",
                        loadingLabel: "Excluindo",
                        variant: "danger",
                        onClick: async () => {
                          await deleteProductAction(dispatch, product.id);
                        },
                      },
                    ];

                    if (!product.total) {
                      controls.unshift({
                        label: "Comprar",
                        client: "true",
                        loadingLabel: "Comprando",
                        variant: "primary",
                        onClick: async () => {
                          handleBuyProduct(product);
                        },
                      });
                    }
                    return controls;
                  })(),

                  groupControls: {
                    onClick: handleChartClick,
                  },
                }}
              />
            </ProductCol>
          ))}
        </Row>
      </ProductContainer>
      {/* pagination controls bottom using react-bootstrap */}
      <Pagination
        page={page}
        pages={pages}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        state={state}
        itemsArray={productsArray}
      />
    </ContentDiv>

  );
};
