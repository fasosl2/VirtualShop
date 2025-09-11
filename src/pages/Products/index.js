import { Row } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { ProductCard } from "../../components/ProductCard";
import {
  openModalCreateProductType,
  openModalBuyProductType,
  openModalSaveItemsType,
  saveProductsSuccessType,
} from "../../storage/types";
import { Notification } from "../../components/Notification/Notification";
import { useEffect, useState } from "react";
import {
  deleteProductAction,
  deleteProductsFromChartAction,
  saveProductsInChartAction,
  fetchProductsAction,
} from "../../actions/productActions";

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

export const Products = () => {
  const { state, dispatch } = useAppContext();
  const [showFeedback, setShowFeedback] = useState(false);
  // pagination
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(state.products?.pages);
  const [limit, setLimit] = useState(10);

  // expect paginated response: state.products = { list, total, page, pages }
  const productsArray = state.products?.list || [];

  const productsTotalized = productsArray.map((product) => ({
    ...product,
    total: state.chart?.products?.find((chart) => chart.id === product.id)
      ?.count,
  }));

  useEffect(() => {
    fetchProductsAction(dispatch, { page, limit });
    fetchChartsAction(dispatch);
  }, [dispatch, page, pages, limit]);

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
    await saveProductsInChartAction(dispatch, product);
    dispatch(openModalBuyProductAction(product));
  };

  useEffect(() => {
    if (state.type === saveProductsSuccessType) {
      handleShowFeedback();
    }
  }, [state.type]);

  return (
    <ContentDiv>
      <ModalCreateSchedule open={state.mode === openModalBuyProductType} />
      <ModalCreateProduct open={state.mode === openModalCreateProductType} />
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
      <ProductContainer fluid>
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
