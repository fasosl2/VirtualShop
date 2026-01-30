import {
  deleteProduct,
  deleteProductFromChart as deleteProductsFromChart,
  getProducts,
  saveProduct,
  saveProductInChart,
} from "../services/productServices";
import utilService from "../services/utilService";
import {
  deleteProductsFromChartInitType,
  deleteProductsFromChartSuccessType,
  deleteProductsInitType,
  deleteProductsSuccessType,
  fetchProductsInitType,
  fetchProductsSuccessType,
  saveProductsInChartInitType,
  saveProductsInChartSuccessType,
  saveProductsInitType,
  saveProductsSuccessType,
} from "../storage/actionConstants";
import React from "react";
import type { IProduct } from "../interfaces/Product";
import type { IChart } from "../interfaces/Chart";
import type { IPaginatedResponse } from "../interfaces/Response";

interface Action {
  type: string;
  payload?: any;
}

export const saveProductsInChartInitAction = () => ({
  type: saveProductsInChartInitType,
});

export const saveProductsInChartSuccessAction = (chart: IChart) => ({
  type: saveProductsInChartSuccessType,
  payload: chart,
});

export const saveProductsInChartAction = async (
  dispatch: React.Dispatch<Action>,
  product: IProduct
) => {
  dispatch(saveProductsInChartInitAction());
  await utilService.sleep(100);
  const chart = await saveProductInChart(product);
  dispatch(saveProductsInChartSuccessAction(chart));
};

export const deleteProductsFromChartInitAction = () => ({
  type: deleteProductsFromChartInitType,
});

export const deleteProductsFromChartSuccessAction = (chart: IChart) => ({
  type: deleteProductsFromChartSuccessType,
  payload: chart,
});

export const deleteProductsFromChartAction = async (
  dispatch: React.Dispatch<Action>,
  product: IProduct,
  negativeValue: number
) => {
  dispatch(deleteProductsFromChartInitAction());
  const chart = await deleteProductsFromChart(product, negativeValue);
  await utilService.sleep(1000);
  dispatch(deleteProductsFromChartSuccessAction(chart));
};

export const fetchProductsInitAction = () => ({
  type: fetchProductsInitType,
});

export const fetchProductsSuccessAction = (products: IPaginatedResponse<IProduct>) => ({
  type: fetchProductsSuccessType,
  payload: products,
});

export const fetchProductsAction = async (
  dispatch: React.Dispatch<Action>,
  opts?: any
) => {
  dispatch(fetchProductsInitAction());
  const products = await getProducts(opts);
  dispatch(fetchProductsSuccessAction(products));
};

export const saveProductsInitAction = () => ({
  type: saveProductsInitType,
});

export const saveProductsSuccessAction = (product: IPaginatedResponse<IProduct>) => ({
  type: saveProductsSuccessType,
  payload: product,
});

export const saveProductsAction = async (
  dispatch: React.Dispatch<Action>,
  productData: IProduct
) => {
  dispatch(saveProductsInitAction());
  await utilService.sleep(1000);
  const newProduct = await saveProduct(productData);
  dispatch(saveProductsSuccessAction(newProduct));
};

export const deleteProductInitAction = () => ({
  type: deleteProductsInitType,
});

export const deleteProductSuccessAction = (products: IPaginatedResponse<IProduct>) => ({
  type: deleteProductsSuccessType,
  payload: products,
});

export const deleteProductAction = async (
  dispatch: React.Dispatch<Action>,
  productId: string
) => {
  dispatch(deleteProductInitAction());
  await utilService.sleep(1000);
  const products = await deleteProduct(productId);
  dispatch(deleteProductSuccessAction(products));
};
