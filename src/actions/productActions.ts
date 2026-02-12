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
import type { IAction } from "../interfaces/Context";

export const saveProductsInChartInitAction = () => ({
  type: saveProductsInChartInitType,
});

export const saveProductsInChartSuccessAction = (chart: IChart) => ({
  type: saveProductsInChartSuccessType,
  payload: chart,
});

export const saveProductsInChartAction = async (
  dispatch: React.Dispatch<IAction>,
  product: IProduct
) => {
  dispatch(saveProductsInChartInitAction());
  const chart = await saveProductInChart(product);
  await utilService.sleep(100);
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
  dispatch: React.Dispatch<IAction>,
  product: IProduct,
  negativeValue: number
) => {
  dispatch(deleteProductsFromChartInitAction());
  const chart = await deleteProductsFromChart(product, negativeValue);
  await utilService.sleep(100);
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
  dispatch: React.Dispatch<IAction>,
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
  dispatch: React.Dispatch<IAction>,
  productData: IProduct
) => {
  dispatch(saveProductsInitAction());
  await utilService.sleep(500);
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
  dispatch: React.Dispatch<IAction>,
  product_id: string
) => {
  dispatch(deleteProductInitAction());
  await utilService.sleep(500);
  const products = await deleteProduct(product_id);
  dispatch(deleteProductSuccessAction(products));
};
