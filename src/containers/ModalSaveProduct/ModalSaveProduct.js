import { Modal } from "../../components/Modal/Modal";
import { ListGroup, Row, Col } from "react-bootstrap";
import { Button } from "../../components/Button/Button";
import { useAppContext } from "../../storage/AppContext";
import { useEffect, useState } from "react";
import {
  fetchChartsAction,
  saveProductsInChartAction,
  openModalSaveChartAction,
  deleteProductsFromChartAction,
} from "../../storage/actions";

export const ModalSaveProduct = ({ open }) => {
  const { state, dispatch } = useAppContext();
  const [itensLoading,setItensLoading] = useState({});

  const handleClickCreateChart = () => {
    dispatch(openModalSaveChartAction());
  };

  const handleSaveProductClick = async (chartId) => {
    setItensLoading(prevState => ({...prevState,[chartId]:true}))
    await saveProductsInChartAction(dispatch, chartId, state.activeProductId);
    setItensLoading(prevState => ({...prevState,[chartId]:false}))
  };

  const handleDeleteProductClick = async (chartId) => {
    setItensLoading(prevState => ({...prevState,[chartId]:true}))
    await deleteProductsFromChartAction(dispatch, chartId, state.activeProductId);
    setItensLoading(prevState => ({...prevState,[chartId]:false}))
  };

  useEffect(() => {
    fetchChartsAction(dispatch);
  }, [dispatch]);

  return (
    <Modal
      title="Salvar Product"
      open={open}
      controls={[
        {
          label: "Criar Pasta",
          loadingLabel: "Criando",
          loading: false,
          variant: "secondary",
          onClick: handleClickCreateChart,
        },
      ]}
    >
      <ListGroup variant="flush">
        {state?.chart?.map((chart, chartIndex) => {
          let productSaved = chart?.products?.find(product => product === state.activeProductId)
          return (
          <ListGroup.Item key={chartIndex}>
            <Row>
              <Col xs={8}>{chart.name}</Col>
              <Col xs={4} className="text-end">
                <Button
                  variant={productSaved ? 'danger' : 'primary'}
                  onClick={productSaved ? () => handleDeleteProductClick(chart.id) : () => handleSaveProductClick(chart.id)}
                  label={productSaved ? 'Remover' : 'Salvar'}
                  loadingLabel={productSaved ? 'Removendo' : 'Salvando'}
                  loading={itensLoading[chart.id]}
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
