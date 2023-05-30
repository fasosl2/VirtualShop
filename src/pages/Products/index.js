import { Container, Row, Col } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { Card } from "../../components/Card";
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
import { FloatingPillButton } from "../../components/FloatingPillButton/FloatingPillButton";
import utilService from "../../services/utilService";

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

  const handleChartClick = async ({product,negativeValue, setItemsLoading, field}) => {
    setItemsLoading((prevState) => ({ ...prevState, [field]: true }));
    dispatch(negativeValue ? await deleteProductsFromChartAction(dispatch,product,negativeValue) : await saveProductsInChartAction(dispatch,product))
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
      {state.mode}
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
      <Container fluid>
          <Row>
          {productsTotalized.map((product) => (
            <Col key={product.id} xs={13} md={4} style={{ marginTop: "1em" }}>
              <Card
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
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
