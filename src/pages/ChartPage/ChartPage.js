import { Container } from "react-bootstrap";
import { ListGroup } from "../../components/ListGroup/ListGroup";
import { useAppContext } from "../../storage/AppContext";
import { useEffect } from "react";
import { fetchChartsAction } from "../../actions/chartActions";
import {
  deleteProductsFromChartAction,
  saveProductsInChartAction,
} from "../../actions/productActions";
// import { Card } from "../../components/Card";
// import { Col, Row } from "react-bootstrap";

export const ChartPage = () => {
  const { state, dispatch } = useAppContext();

  const handleClick = async (product, negativeValue, setItensLoading) => {
    setItensLoading((prevState) => ({ ...prevState, [product.id]: true }));
    dispatch(
      negativeValue
        ? await deleteProductsFromChartAction(dispatch, product, negativeValue)
        : await saveProductsInChartAction(dispatch, product)
    );
    setItensLoading((prevState) => ({ ...prevState, [product.id]: false }));
  };
  useEffect(() => {
    fetchChartsAction(dispatch);
  }, [dispatch]);

  return (
    <Container>            
            <ListGroup
              items={state.chart?.products.map((product) => ({
                key: product.id,
                id: product.id,
                value: product.price || "$0,00",
                title: product.title,
                total: product.count,
                image: product.image,
                onClick: handleClick,
              }))}
            />
    </Container>
  );
};
