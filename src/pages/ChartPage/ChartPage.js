import { Container } from "react-bootstrap";
import { ListGroup } from "../../components/ListGroup/ListGroup";
import { useAppContext } from "../../storage/AppContext";
import { useEffect } from "react";
import { deleteProductFromChartAction, fetchChartsAction, saveProductInChartAction } from "../../storage/actions";

export const ChartPage = () => {
  const { state, dispatch } = useAppContext();

  
  const handleClick = async (product,negativeValue,setItensLoading) => {
    setItensLoading(prevState => ({...prevState,[product.id]:true}))
    dispatch(negativeValue ? await deleteProductFromChartAction(dispatch,product,negativeValue) : await saveProductInChartAction(dispatch,product))
    setItensLoading(prevState => ({...prevState,[product.id]:false}))
  }
  useEffect(() => {
    fetchChartsAction(dispatch);
  }, [dispatch]);

  return (
    <Container>
      <h1>Carrinho de Compras</h1>
      <ListGroup
        items={state.chart?.products.map((product) => (
          { 
            key: product.id,
            id: product.id,
            value: product.price || '$0,00',
            title: product.title, 
            total: product.count,
            onClick: handleClick
          }
        ))}
      />
    </Container>
  );
};
