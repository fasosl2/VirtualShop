import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal";
import { Col, Row } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import {
  deleteProductsFromChartAction,
  saveProductsInChartAction,
} from "../../actions/productActions";
import {
  closeModalsAction,
  openModalBuyProductAction,
} from "../../actions/modalsActions";
import {
  closeModalsType,
  saveProductsInChartInitType,
} from "../../storage/actionConstants";
import utilService from "../../services/utilService";
import { CountButtonGroup } from "../../components/CountButtonGroup";
import {
  GalleryContainer,
  ImageContainer,
  ProductImage,
  ThumbnailContainer,
  ThumbnailImage,
  ThumbnailText,
  ThumbnailWrapper,
} from "./styles";
import { getProducts } from "../../services/productServices";
import type { IProduct } from "../../interfaces/Product";
import type { IChartProduct } from "../../interfaces/Chart";
import type { IModal } from "../../components/Modal/type";
import type { IChartItemClickParams } from "../../components/CountButtonGroup/type";

export const ModalBuyProduct = ({ open }: IModal) => {
  const { state, dispatch } = useAppContext();
  const [count, setCount] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (state.type === closeModalsType) {
      setCount(0);
      setRelatedProducts([]);
    } else {
      setCount(
        state.chart?.products?.find(
          (chart: IChartProduct) => chart._id === state.activeProduct?._id
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
  }, [state.type, state.activeProduct, open, dispatch]);

  const handleChartClick = async ({
    element,
    negativeValue,
    setItemsLoading,
    field,
  }: IChartItemClickParams) => {
    setItemsLoading((prevState) => ({ ...prevState, [field]: true }));
    if(negativeValue){
      await deleteProductsFromChartAction(dispatch, element as IChartProduct, negativeValue);
    } else{
      await saveProductsInChartAction(dispatch, element as IChartProduct);
    }
    setItemsLoading((prevState) => ({ ...prevState, [field]: false }));
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
                (p: IChartProduct) => p._id === state.activeProduct?._id
              );
              const quantityToRemove = productInChart
                ? productInChart.count
                : 0;

              if (quantityToRemove > 0) {
                await handleChartClick({
                  element: state.activeProduct,
                  negativeValue: quantityToRemove,
                  field: `chart-card-btn-${state.activeProduct._id}`
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
                  {relatedProducts.map((prod: IProduct) => (
                    <ThumbnailWrapper
                      key={prod._id}
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
          <Row>
          <Col>
            quantidade:
            <br />
            <CountButtonGroup
              {...{
                total: count,
                onClick: handleChartClick,
                element: state.activeProduct,
                contentLabel: "Compra",
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
          <Col>
          <Row>
            <Col>
              Valor Unitário: 
              <strong>
                {utilService.formatCurrency(Number(state?.activeProduct?.price || 0))}
              </strong>
            </Col>
          </Row>
          </Col>
        </Row>
      </Col>
    </Modal>
  );
};
