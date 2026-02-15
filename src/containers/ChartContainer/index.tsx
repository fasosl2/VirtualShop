import React, { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { Container } from "./styles";
import { useAppContext } from "../../storage/AppContext";
import { ChartList } from "../../components/ChartList";
import {
  deleteProductsFromChartAction,
  saveProductsInChartAction,
} from "../../actions/productActions";
import { fetchChartsAction } from "../../actions/chartActions";
import type { IChartProduct } from "../../interfaces/Chart";
import type { IChartItemClickParams } from "../../components/CountButtonGroup/type";

export const ChartContainer: React.FC = () => {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    fetchChartsAction(dispatch);
  }, [dispatch]);

  const handleChartClick = async ({
    element,
    negativeValue,
    setItemsLoading,
    field,
  }: IChartItemClickParams) => {

    setItemsLoading && setItemsLoading((prevState) => ({ ...prevState, [field]: true }));

    if(negativeValue){
      await deleteProductsFromChartAction(dispatch, element as IChartProduct, negativeValue);
    } else{
      await saveProductsInChartAction(dispatch, element as IChartProduct);
    }
    

    setItemsLoading && setItemsLoading((prevState) => ({ ...prevState, [field]: false }));
  };

  const chartItems = state.chart?.products.map((product) => ({
    ...product,
    value: product.price || 0,
    total: product.count,
    onClick: handleChartClick,
  }));

  return (
    <Dropdown id={"dropdown"}>
      <Dropdown.Toggle variant="light">Carrinho</Dropdown.Toggle>
      <Dropdown.Menu>
        <Container>
          <ChartList items={chartItems as any} compactChart={true} />
        </Container>
      </Dropdown.Menu>
    </Dropdown>
  );
};