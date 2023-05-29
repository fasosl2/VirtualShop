import {
  deleteProduct,
  deleteProductFromChart as deleteProductsFromChart,
  getProducts,
  saveProduct,
  saveProductInChart,
} from "../services/productServices";
import utilService from "../services/utilService";
import { deleteProductsFromChartInitType, deleteProductsFromChartSuccessType, deleteProductsInitType, deleteProductsSuccessType, fetchProductsInitType, fetchProductsSuccessType, saveProductsInChartInitType, saveProductsInChartSuccessType, saveProductsInitType, saveProductsSuccessType } from "../storage/types";

export const saveProductsInChartInitAction = () => ({
  type: saveProductsInChartInitType,
});

export const saveProductsInChartSuccessAction = (charts) => ({
  type: saveProductsInChartSuccessType,
  payload: charts,
});

export const saveProductsInChartAction = async (dispatch, product) => {
  dispatch(saveProductsInChartInitAction());
  await utilService.sleep(100);
  const chart = await saveProductInChart(product);
  dispatch(saveProductsInChartSuccessAction(chart));
};

export const deleteProductsFromChartInitAction = () => ({
  type: deleteProductsFromChartInitType,
});

export const deleteProductsFromChartSuccessAction = (charts) => ({
  type: deleteProductsFromChartSuccessType,
  payload: charts,
});

export const deleteProductsFromChartAction = async (
  dispatch,
  product,
  negativeValue
) => {
  dispatch(deleteProductsFromChartInitAction());
  const chart = await deleteProductsFromChart(product, negativeValue);
  await utilService.sleep(100);
  dispatch(deleteProductsFromChartSuccessAction(chart));
};

export const fetchProductsInitAction = () => ({
  type: fetchProductsInitType,
});

export const fetchProductsSuccessAction = (products) => ({
  type: fetchProductsSuccessType,
  payload: products,
});

export const fetchProductsAction = async (dispatch) => {
  dispatch(fetchProductsInitAction());
  const products = await getProducts();
  dispatch(fetchProductsSuccessAction(products));
};

export const saveProductsInitAction = () => ({
  type: saveProductsInitType,
});

export const saveProductsSuccessAction = (products) => ({
  type: saveProductsSuccessType,
  payload: products,
});

export const saveProductsAction = async (dispatch, productData) => {
  dispatch(saveProductsInitAction());
  await utilService.sleep(1000);
  const newProduct = await saveProduct(productData);
  dispatch(saveProductsSuccessAction(newProduct));
};

export const deleteProductInitAction = () => ({
  type: deleteProductsInitType,
});

export const deleteProductSuccessAction = (products) => ({
  type: deleteProductsSuccessType,
  payload: products,
});

export const deleteProductAction = async (dispatch, product) => {
  dispatch(deleteProductInitAction());
  await utilService.sleep(1000);
  const products = await deleteProduct(product);
  dispatch(deleteProductSuccessAction(products));
};
