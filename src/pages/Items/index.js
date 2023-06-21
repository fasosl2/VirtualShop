import { Container, Row, Col } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { Card } from "../../components/Card";
import { openModalCreateItemType, saveItemsSuccessType } from "../../storage/types";
import { Notification } from "../../components/Notification/Notification";
import { useEffect, useState } from "react";
import {
  deleteItemAction,
  fetchItemsAction,
} from "../../actions/itemsAction";
import {
  openModalCreateItemAction,
} from "../../actions/modalsActions";
import { ModalCreateItem } from "../../containers/ModalCreateItem";
import { FloatingPillButton } from "../../components/FloatingPillButton";
import utilService from "../../services/utilService";

export const Items = () => {
  const { state, dispatch } = useAppContext();
  const [showFeedback, setShowFeedback] = useState(false);

  const itemsProcessed = state.items.map((item) => ({
    ...item,
  }));

  useEffect(() => {
    fetchItemsAction(dispatch);
  }, [dispatch]);

  const handleShowFeedback = async () => {
    setShowFeedback(true);
    await utilService.sleep(5000);
    setShowFeedback(false);
  };

  const handleCreateOrUpdate = (item) => {
    dispatch(openModalCreateItemAction(item));
  };

  useEffect(() => {
    if (state.type === saveItemsSuccessType) {
      handleShowFeedback();
    }
  }, [state.type]);

  return (
    <div>
      <ModalCreateItem open={state.mode === openModalCreateItemType} />
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
          {itemsProcessed.map((item) => (
            <Col key={item.id} xs={13} md={4} style={{ marginTop: "1em" }}>
              <Card
                {...{
                  ...item,
                  subTitle: "Estoque: " + item.stock,
                  controls: [{
                      label: 'Editar',
                      loadingLabel: 'Editando',
                      variant: 'warning',
                      onClick: async () => {
                        handleCreateOrUpdate(item);
                      }
                    },{
                      label: 'Excluir',
                      loadingLabel: 'Excluindo',
                      variant: 'danger',
                      onClick: async () => {
                        await deleteItemAction(dispatch, item.id);
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
