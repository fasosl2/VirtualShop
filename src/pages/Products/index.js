import { Row } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { ProductCard } from "../../components/ProductCard";
import { openModalCreateProductType, openModalSaveItemsType, saveProductsSuccessType } from "../../storage/types";
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
} from "../../actions/modalsActions";
import { ModalSaveItems } from "../../containers/ModalSaveItem";
import { ModalCreateProduct } from "../../containers/ModalCreateProduct";
import { FloatingPillButton } from "../../components/FloatingPillButton";
import utilService from "../../services/utilService";
import { ProductCol, ProductContainer } from "./styles";

export const Products = () => {
  const { state, dispatch } = useAppContext();
  const [showFeedback, setShowFeedback] = useState(false);

  const productsTotalized = state.products.map((product) => ({
    ...product,
    total: state.chart?.products?.find((chart) => chart.id === product.id)?.count,
  }));

  useEffect(() => {
    fetchProductsAction(dispatch);
    fetchChartsAction(dispatch);
  }, [dispatch]);

  const handleShowFeedback = async () => {
    setShowFeedback(true);
    await utilService.sleep(5000);
    setShowFeedback(false);
  };

  const handleChartClick = async ({ element,negativeValue, setItemsLoading, field}) => {
    setItemsLoading((prevState) => ({ ...prevState, [field]: true }));
    dispatch(negativeValue ? await deleteProductsFromChartAction(dispatch,element,negativeValue) : await saveProductsInChartAction(dispatch,element))
    setItemsLoading((prevState) => ({ ...prevState, [field]: false }));
  }

  const handleCreateOrUpdate = (product) => {
    dispatch(openModalCreateProductAction(product));
  };

  useEffect(() => {
    if (state.type === saveProductsSuccessType) {
      handleShowFeedback();
    }
  }, [state.type]);

  return (
    <div>
      <ModalCreateProduct open={state.mode === openModalCreateProductType} />
      <ModalSaveItems open={state.mode === openModalSaveItemsType} />
      {['Master','Gestor'].includes(state?.currentUser?.type) && 
            (<FloatingPillButton label="+" onClick={handleCreateOrUpdate} />) }
      
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
            <ProductCol key={product.id} xs={13} style={{ marginTop: "1em"}}>
              <ProductCard
                {...{
                  ...product,
                  subTitle: "R$ " + String(Number(product.price).toFixed(2)),
                  controls: [{
                      label: 'Editar',
                      loadingLabel: 'Editando',
                      variant: 'warning',
                      onClick: async () => {
                        handleCreateOrUpdate(product);
                      }
                    },{
                      label: 'Excluir',
                      loadingLabel: 'Excluindo',
                      variant: 'danger',
                      onClick: async () => {
                        await deleteProductAction(dispatch, product.id);
                      }
                  },
                ],
                  groupControls: {
                    onClick: handleChartClick
                  }
                }}
              />
            </ProductCol>
          ))}
        </Row>
      </ProductContainer>
    </div>
  );
};
