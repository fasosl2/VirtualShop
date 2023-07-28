import React, { useEffect, useMemo, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { Button } from "../../components/Button";
import { Container, LoginImage } from "./styles";
import { useAppContext } from "../../storage/AppContext";
import {
  authUsersAction,
  loginUsersAction,
  logoutUsersAction,
} from "../../actions/userActions";
import { loginUsersSuccessType } from "../../storage/types";
import { ChartList } from "../../components/ChartList";
import {
  deleteProductsFromChartAction,
  saveProductsInChartAction,
} from "../../actions/productActions";
import { fetchChartsAction } from "../../actions/chartActions";

export const ChartContainer = (...props) => {
  const { state, dispatch } = useAppContext();
  useEffect(() => {
    fetchChartsAction(dispatch);
  }, [dispatch]);

  const handleChartClick = async ({
    element,
    negativeValue,
    setItemsLoading,
    field,
  }) => {
    setItemsLoading((prevState) => ({ ...prevState, [field]: true }));
    dispatch(
      negativeValue
        ? await deleteProductsFromChartAction(dispatch, element, negativeValue)
        : await saveProductsInChartAction(dispatch, element)
    );
    setItemsLoading((prevState) => ({ ...prevState, [field]: false }));
  };

  return (
    <Dropdown id={"dropdown"} >
      <Dropdown.Toggle variant="light">Carrinho</Dropdown.Toggle>
      <Dropdown.Menu >
        <Container>
          <ChartList
            items={state.chart?.products.map((product) => ({
              key: product.id,
              id: product.id,
              value: product.price || "$0,00",
              title: product.title,
              total: product.count,
              image: product.image,
              onClick: handleChartClick,
            }))}
            compact={true}
          />
        </Container>
      </Dropdown.Menu>
    </Dropdown>
  );
};
