import { Modal } from "../../components/Modal/Modal";
import { ListGroup, Row, Col } from "react-bootstrap";
import { Button } from "../../components/Button";
import { useAppContext } from "../../storage/AppContext";
import { useEffect, useState } from "react";
import { fetchItemsAction, removeItemsAction, selectItemsAction } from "../../actions/itemsAction";
import { openModalCreateProductAction } from "../../actions/modalsActions";
import { CountButtonGroup } from "../../components/CountButtonGroup";

export const ModalSaveItems = ({ open }) => {
  const { state, dispatch } = useAppContext();
  const [itensLoading,setItensLoading] = useState({});

  const handleClickSaveItems = () => {
    dispatch(openModalCreateProductAction());
  };
  const handleToggleItemClick = async ({ element,negativeValue, setItemsLoading, field}) => {
    setItemsLoading((prevState) => ({ ...prevState, [field]: true }));
    dispatch(negativeValue 
      ? await removeItemsAction({dispatch,selectedItems:state.selectedItems,item:element,negativeValue}) 
      : await selectItemsAction({dispatch,selectedItems:state.selectedItems,item:element}))
    setItemsLoading((prevState) => ({ ...prevState, [field]: false }));
  }
  useEffect(() => {
    fetchItemsAction(dispatch)
  }, [dispatch]);

  return (
    <Modal
      title="Adicionar Items"
      open={open}
      controls={[
        {
          label: "Salvar",
          loadingLabel: "Salvando",
          loading: false,
          variant: "secondary",
          onClick: handleClickSaveItems,
        },
      ]}
    >
      <ListGroup variant="flush">
        {state?.items?.map((item, itemIndex) => {
          let itemSaved = state?.selectedItems.find(selectedItem => selectedItem.id === item.id)
          return (
          <ListGroup.Item key={itemIndex}>
            <Row>
              <Col xs={5}>{item.title}</Col>
              <Col xs={4} className="text-end">
              <CountButtonGroup
                {...{total: itemSaved?.total || 0,
                  onClick: handleToggleItemClick, 
                  element: item,
                  contentlabel:'Compra', 
                  emptyLabel:'Exclui'}}
                />
              </Col>
            </Row>
          </ListGroup.Item>
        )}
        )}
      </ListGroup>
    </Modal>
  );
};
