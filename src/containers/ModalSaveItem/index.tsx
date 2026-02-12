import { Modal } from "../../components/Modal";
import { ListGroup, Row, Col } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { useEffect } from "react";
import {
  fetchItemsAction,
  removeItemsAction,
  selectItemsAction,
} from "../../actions/itemsAction";
import { openModalCreateProductAction } from "../../actions/modalsActions";
import { CountButtonGroup } from "../../components/CountButtonGroup";
import type { IChartItemClickParams } from "../../components/CountButtonGroup/type";

interface ModalSaveItemsProps {
  open: boolean;
}

export const ModalSaveItems = ({ open }: ModalSaveItemsProps) => {
  const { state, dispatch } = useAppContext();

  const handleClickSaveItems = () => {
    dispatch(openModalCreateProductAction(null));
  };
  const handleToggleItemClick = async ({
    element,
    negativeValue,
  }: IChartItemClickParams) => {
    if (negativeValue) {
      await removeItemsAction({
        dispatch,
        selectedItems: state.selectedItems,
        item: element,
        negativeValue,
      })
    } else {
      await selectItemsAction({
        dispatch,
        selectedItems: state.selectedItems,
        item: element,
      })
    }
  };
  useEffect(() => {
    fetchItemsAction(dispatch);
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
          let itemSaved = state?.selectedItems.find(
            (selectedItem) => selectedItem._id === item._id
          );
          return (
            <ListGroup.Item key={itemIndex}>
              <Row>
                <Col xs={5}>{item.title}</Col>
                <Col xs={4} className="text-end">
                  <CountButtonGroup
                    {...{
                      total: itemSaved?.total || 0,
                      onClick: handleToggleItemClick,
                      element: item,
                      contentLabel: "Compra",
                      emptyLabel: "Exclui",
                    }}
                  />
                </Col>
              </Row>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Modal>
  );
};
