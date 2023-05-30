import { Modal } from "../../components/Modal/Modal";
import { ListGroup, Row, Col } from "react-bootstrap";
import { Button } from "../../components/Button/Button";
import { useAppContext } from "../../storage/AppContext";
import { useEffect, useState } from "react";
import { fetchItemsAction, removeItemsAction, selectItemsAction } from "../../actions/itemsAction";
import { openModalCreateProductAction } from "../../actions/modalsActions";

export const ModalSaveItems = ({ open }) => {
  const { state, dispatch } = useAppContext();
  const [itensLoading,setItensLoading] = useState({});

  const handleClickSaveItems = () => {
    dispatch(openModalCreateProductAction());
  };

  const handleSelectItemClick = async (item) => {
    setItensLoading(prevState => ({...prevState,[item.id]:true}))
    await selectItemsAction({dispatch,selectedItems:state.selectedItems,item});
    setItensLoading(prevState => ({...prevState,[item.id]:false}))
  };

  const handleRemoveItemClick = async (item,negativeValue) => {
    setItensLoading(prevState => ({...prevState,[item.id]:true}))
    await removeItemsAction({dispatch,selectedItems:state.selectedItems,item,negativeValue});
    setItensLoading(prevState => ({...prevState,[item.id]:false}))
  };

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
              <Col xs={8}>{item.title}</Col>
              <Col xs={4} className="text-end">
                <Button
                  variant={itemSaved ? 'danger' : 'primary'}
                  onClick={itemSaved ? () => handleRemoveItemClick(item) : () => handleSelectItemClick(item)}
                  label={itemSaved ? 'Remover' : 'Salvar'}
                  loadingLabel={itemSaved ? 'Removendo' : 'Salvando'}
                  loading={itensLoading[item.id]}
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
