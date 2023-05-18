import { Container, Row, Col } from "react-bootstrap";
import { useAppContext } from "../../storage/AppContext";
import { CardContainer } from "../../containers/CardContainer/CardContainer";
import { saveChartsSuccessType } from "../../storage/types";
import { Notification } from "../../components/Notification/Notification";
import { useEffect, useState } from "react";
import { fetchChartsAction, fetchProductsAction, openModalCreateProductAction, /* openModalCreateProductAction,  */sleep } from "../../storage/actions";
// import { ModalSaveProduct } from "../../containers/ModalSaveProduct/ModalSaveProduct";
import { ModalCreateProduct } from "../../containers/ModalCreateProduct/ModalCreateProduct";
// import { ModalCreateChart } from "../../containers/ModalCreateChart/ModalCreateChart";
import { FloatingPillButton } from "../../components/FloatingPillButton/FloatingPillButton";

export const Products = () => {
  const { state,dispatch } = useAppContext();
  const [showFeedback, setShowFeedback] = useState(false);

  const productsTotalized = state.products.map(product => ({...product,
    total: state.chart?.products?.find(chart=> chart.id === product.id)?.count
  }));

  useEffect(() => {
    fetchProductsAction(dispatch);
    fetchChartsAction(dispatch);
  }, [dispatch]);

  const handleShowFeedback = async () => {
      setShowFeedback(true);
      await sleep(5000);
      setShowFeedback(false);
  }

  
   const handlePlusButtonClick = (productId) => {
    dispatch(openModalCreateProductAction())
  }

  useEffect(() => {
    if (state.type === saveChartsSuccessType) {
      handleShowFeedback();
    }
  }, [state.type]);

  return (
    <div>
      {/* <ModalSaveProduct open={state.mode === "saveProduct"} /> */}
      {/* <ModalCreateChart open={state.mode === "createChart"} /> */}
      <ModalCreateProduct open={state.mode === "createProduct"} />
      <FloatingPillButton label="+"  onClick={handlePlusButtonClick}/>
      {showFeedback && (
        <Notification
          message="Criado com sucesso"
          onClose={() => {
            setShowFeedback(false);
          }}
        />
      )}
      <Container fluid>
        <Row >
        {productsTotalized.map((product) =>(
          <Col key={product.id} xs={13} md={4} style={{marginTop:'1em'}}>
            <CardContainer
              {...product}
            />
          </Col>
        ))}
        </Row>
      </Container>
    </div>
  );
};
