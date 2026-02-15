import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { ProductCard } from "../../components/ProductCard";
import {
  openModalCreateProductType,
  openModalBuyProductType,
  saveProductsSuccessType,
  openModalCreateCategoriesType,
} from "../../storage/actionConstants";
import { Notification } from "../../components/Notification";
import { useEffect, useState, type ChangeEvent } from "react";
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
import { ModalBuyProduct } from "../../containers/ModalBuyProduct";

import { ContentDiv } from "../../styles/global";
import { Pagination } from "../../components/Pagination";
import { ModalCreateCategories } from "../../containers/ModalCreateCategories";
import type { IProduct } from "../../interfaces/Product";
import type { IChartItemClickParams } from "../../components/CountButtonGroup/type";

type ProductFilters = {
  categories: string;
  title: string;
};

type ProductWithTotal = IProduct & {
  total?: number;
};

export const Products = () => {
  const { state, dispatch } = useAppContext();
  const [showFeedback, setShowFeedback] = useState(false);

  const [page, setPage] = useState(state.products?.page || 1);
  const [filters, setFilters] = useState<ProductFilters>({
    categories: "",
    title: "",
  });
  const [pages, setPages] = useState(state.products?.pages || 1);
  const [limit, setLimit] = useState(10);
  const [apiFilters, setApiFilters] = useState<Partial<ProductFilters>>({});

  const productsArray: IProduct[] = state.products?.list || [];
  const productsTotalized: ProductWithTotal[] = productsArray.map((product) => ({
    ...product,
    total: state.chart?.products?.find((chartProduct) => chartProduct._id === product._id)
      ?.count,
  }));

  useEffect(() => {
    fetchProductsAction(dispatch, { page, limit, ...apiFilters });
    fetchChartsAction(dispatch);
  }, [dispatch, pages, page, limit, apiFilters]);

  useEffect(() => {
    fetchCategoriesAction(dispatch,{});
  }, [dispatch]);

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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
    const newFilters = Object.entries(filters).reduce<Partial<ProductFilters>>(
      (acc, [key, value]) => {
        if (value) {
          acc[key as keyof ProductFilters] = value;
        }
        return acc;
      },
      {}
    );

    setPage(1);
    setApiFilters(newFilters);
    fetchProductsAction(dispatch, { page: 1, limit, ...newFilters });
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
  }: IChartItemClickParams) => {
    if (!setItemsLoading || !field) {
      return;
    }

    setItemsLoading((prevState) => ({ ...prevState, [field]: true }));

    if (negativeValue) {
      await deleteProductsFromChartAction(dispatch, element, negativeValue);
    } else {
      await saveProductsInChartAction(dispatch, element);
    }

    setItemsLoading((prevState) => ({ ...prevState, [field]: false }));
  };

  const handlePlusButtonClick = () => {
    dispatch(openModalCreateProductAction(null));
  };

  const handleCreateOrUpdate = (product: IProduct) => {
    dispatch(openModalCreateProductAction(product));
  };

  const handleBuyProduct = async (product: IProduct) => {
    dispatch(openModalBuyProductAction(product));
  };

  useEffect(() => {
    if (state.type === saveProductsSuccessType) {
      handleShowFeedback();
    }
    setPages(state.products?.pages || 1);
  }, [state.type, state.products?.pages]);

  return (
    <ContentDiv>
      <ModalBuyProduct open={state.mode === openModalBuyProductType} />
      <ModalCreateProduct open={state.mode === openModalCreateProductType} />
      <ModalCreateCategories open={state.mode === openModalCreateCategoriesType} />

      {["Master", "Gestor"].includes(state?.currentUser?.type) && (
        <FloatingPillButton label="+" onClick={handlePlusButtonClick} />
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
                <Form.Select
                  name="categories"
                  value={filters.categories}
                  onChange={handleFilterChange}
                >
                  <option value="">Todos</option>
                  {state?.categories?.list?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
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
                className="w-100"
              >
                Limpar
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <ProductContainer fluid>
        <Row>
          {productsTotalized.map((product, index) => (
            <ProductCol
              key={product._id ?? `product-${index}`}
              xl={6}
              xs={12}
              style={{ marginTop: "1em" }}
            >
              <ProductCard
                {...{
                  ...product,
                  controls: (() => {
                    const controls = [
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
                          await deleteProductAction(dispatch, product._id);
                        },
                      },
                    ];

                    if (!product.total) {
                      controls.unshift({
                        label: "Comprar",
                        //client: "true",
                        loadingLabel: "Comprando",
                        variant: "primary",
                        onClick: async () => {
                          await handleBuyProduct(product);
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
      <Pagination
        page={page}
        pages={pages}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        itemsArray={productsArray}
      />
    </ContentDiv>
  );
};
