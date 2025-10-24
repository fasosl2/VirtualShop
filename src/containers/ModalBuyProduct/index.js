import { useEffect, useRef, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { Col, Form, Row } from "react-bootstrap";
import { useAppContext, AppContextProvider } from "../../storage/AppContext";
import {
  deleteProductsFromChartAction,
  saveProductsAction,
  saveProductsInChartAction,
} from "../../actions/productActions";
import {
  closeModalsAction,
  openModalBuyProductAction,
  openModalSaveItemsAction,
} from "../../actions/modalsActions";
import {
  closeModalsType,
  saveProductsInChartInitType,
  saveProductsInitType,
  saveProductsSuccessType,
} from "../../storage/types";
import utilService from "../../services/utilService";
import userLogo from "../../assets/user-logo.png";
import { Calendar } from "../../components/Calendar";
import { Button } from "../../components/Button";
import { CountButtonGroup } from "../../components/CountButtonGroup";
import {
  GalleryContainer,
  ImageContainer,
  ProductImage,
  Thumbnail,
  ThumbnailContainer,
  ThumbnailImage,
  ThumbnailText,
  ThumbnailWrapper,
} from "./styles";
import { getProducts } from "../../services/productServices";

export const ModalCreateSchedule = ({ open }) => {
  const { state, dispatch } = useAppContext();
  const [startDate, setStartDate] = useState(new Date());
  const [count, setCount] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (state.type === closeModalsType) {
      setStartDate(new Date());
      setCount(0);
      setRelatedProducts([]);
    } else {
      setCount(
        state.chart?.products?.find(
          (chart) => chart.id === state.activeProduct?.id
        )?.count || 0
      );
    }
    if (open && state.activeProduct) {
      const fetchRelated = async () => {
        let baseId =
          state?.activeProduct?.variant?.baseID || state?.activeProduct?._id;

        if (baseId) {
          const result = await getProducts({ baseID: baseId });
          setRelatedProducts(result?.list || []);
        }
      };
      fetchRelated();
    }
  }, [state.type, state.activeProduct, dispatch]);

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

  const handleClick = async (field, element, total, onClick) => {
    setCount((prevState) => ({ ...prevState, [field]: true }));
    await onClick({ element, negativeValue: total, setCount, field });
    setCount((prevState) => ({ ...prevState, [field]: false }));
  };

  const filterPassedDate = (date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    const day = date.getDay();
    return (
      !state?.activeProduct?.blockedDays[day] && currentDate <= selectedDate
    );
  };
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return (
      currentDate.getTime() < selectedDate.getTime() &&
      selectedDate.getHours() >= 8 &&
      selectedDate.getHours() < 23
    );
  };

  return (
    <Modal
      title={"Comprar"}
      open={open}
      controls={[
        {
          label: "Confirmar",
          loadingLabel: "Confirmando",
          loading: state.type === saveProductsInChartInitType,
          variant: "primary",
          onClick: async () => {
            await dispatch(closeModalsAction());
          },
        },
        {
          label: count ? "Remover" : "Cancelar",
          loadingLabel: count ? "Removendo" : "Cancelando",
          variant: "danger",
          onClick: async () => {
            if (state.activeProduct && state.chart?.products) {
              const productInChart = state.chart.products.find(
                (p) => p.id === state.activeProduct.id
              );
              const quantityToRemove = productInChart
                ? productInChart.count
                : 0;

              if (quantityToRemove > 0) {
                await handleChartClick({
                  element: state.activeProduct,
                  negativeValue: quantityToRemove,
                  setItemsLoading: () => {},
                });
              }
            }
            dispatch(closeModalsAction());
          },
        },
      ]}
    >
      <h5>{state?.activeProduct?.title}</h5>
      <Col>
        <Row>
          <Col>
            {state.activeProduct?.image && (
              <ImageContainer>
                <ProductImage
                  src={state.activeProduct.image}
                  alt={state.activeProduct.title}
                />
              </ImageContainer>
            )}
            {relatedProducts.length > 0 && (
              <GalleryContainer>
                <ThumbnailContainer>
                  {relatedProducts.map((prod) => (
                    <ThumbnailWrapper
                      key={prod.id}
                      onClick={() => dispatch(openModalBuyProductAction(prod))}
                    >
                      <ThumbnailImage src={prod.image} alt={prod.shortTitle} />
                      <ThumbnailText>{prod.shortTitle}</ThumbnailText>
                    </ThumbnailWrapper>
                  ))}
                </ThumbnailContainer>
              </GalleryContainer>
            )}
          </Col>
          <Col>{state?.activeProduct?.description}</Col>
        </Row>
        <br />
        <Row>
          <Col>
            quantidade:
            <br />
            <CountButtonGroup
              {...{
                total: count,
                onClick: handleChartClick,
                element: state.activeProduct,
                contentlabel: "Compra",
                //emptyLabel: "Remove",
              }}
            />
          </Col>
          <Col>
            Valor Total:
            <br />
            <strong>
              {utilService.formatCurrency(
                (count || 0) * (state?.activeProduct?.price || 0)
              )}
            </strong>
          </Col>
        </Row>
      </Col>
    </Modal>
  );
};
