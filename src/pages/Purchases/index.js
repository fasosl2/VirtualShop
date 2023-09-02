import { Container, Row, Col } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { Card } from "../../components/Card";
import { savePurchasesSuccessType } from "../../storage/types";
import { Notification } from "../../components/Notification/Notification";
import { useEffect, useState } from "react";
import {
  deletePurchaseAction,
  fetchPurchasesAction,
} from "../../actions/purchasesAction";
import utilService from "../../services/utilService";

export const Purchases = () => {
  const { state, dispatch } = useAppContext();
  const [showFeedback, setShowFeedback] = useState(false);

  const purchasesProcessed = state.purchases.map((purchase) => ({
    ...purchase,
  }));

  useEffect(() => {
    fetchPurchasesAction(dispatch);
  }, [dispatch]);

  const handleShowFeedback = async () => {
    setShowFeedback(true);
    await utilService.sleep(5000);
    setShowFeedback(false);
  };

  const handleCreateOrUpdate = (purchase) => {
    /* dispatch(openModalCreatePurchaseAction(purchase)); */
  };

  useEffect(() => {
    if (state.type === savePurchasesSuccessType) {
      handleShowFeedback();
    }
  }, [state.type]);

  return (
    <div>      
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
          {purchasesProcessed.map((purchase) => (
            <Col key={purchase.id} xs={13} md={4} style={{ marginTop: "1em" }}>
              <Card
                {...{
                  ...purchase,
                  subTitle: <div>
                    <p>Endereço: {purchase?.address}</p>
                    <p>Produtos:
                    <br/> 
                    <br/> 
                      {purchase?.products.map(ele => <p>{ele.title}</p>)}
                      </p>
                    </div>,
                  controls: [{
                      label: 'Editar',
                      loadingLabel: 'Editando',
                      variant: 'warning',
                      onClick: async () => {
                        handleCreateOrUpdate(purchase);
                      }
                    },{
                      label: 'Excluir',
                      loadingLabel: 'Excluindo',
                      variant: 'danger',
                      onClick: async () => {
                        await deletePurchaseAction(dispatch, purchase.id);
                      }
                  },
                ],
                }}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
