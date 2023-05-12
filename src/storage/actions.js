import { deleteProduct, deleteProductFromChart, getProducts, saveProduct, saveProductInChart } from "../services/productServices";
import { deleteChart, getChart, postChart } from "../services/chartServices";
import {
  closeModalsType,
  deleteChartInitType,
  deleteChartSuccessType,
  deleteProductFromChartInitType,
  deleteProductFromChartSuccessType,
  deleteProductInitType,
  deleteProductSuccessType,
  fetchChartsInitType,
  fetchChartsSuccessType,
  fetchProductsInitType,
  fetchProductsSuccessType,
  openModalCreateProductType,
  openModalSaveChartType,
  openModalSaveProductType,
  saveChartsInitType,
  saveChartsSuccessType,
  saveProductInChartInitType,
  saveProductInChartSuccessType,
  saveProductsInitType,
  saveProductsSuccessType,
} from "./types";

export const sleep = (time) => (
  new Promise(resolve =>{
    setTimeout(resolve,time)
  })
);
export const openModalCreateProductAction = () => ({
  type: openModalCreateProductType
});
export const openModalSaveProductAction = (productId) => ({
  type: openModalSaveProductType,
  payload: productId
});

export const openModalSaveChartAction = () => ({
  type: openModalSaveChartType,
});

export const closeModalsAction = () => ({
  type: closeModalsType,
});

export const fetchChartsInitAction = () => ({
  type: fetchChartsInitType,
});

export const fetchChartsSuccessAction = (charts) => ({
  type: fetchChartsSuccessType,
  payload: charts
});

export const fetchChartsAction = async (dispatch) => {
  dispatch(fetchChartsInitAction());
  const charts = await getChart();
  dispatch(fetchChartsSuccessAction(charts));
};

export const saveChartsInitAction = () => ({
  type: saveChartsInitType,
});

export const saveChartsSuccessAction = (charts) => ({
  type: saveChartsSuccessType,
  payload: charts
});

export const saveChartsAction = async (dispatch,chartName,productId) => {
  dispatch(saveChartsInitAction());
  await sleep(1000);
  const newChart = await postChart(chartName);
  const resultChart = await saveProductInChart(newChart.id,productId);
  dispatch(saveChartsSuccessAction(resultChart));
};

export const saveProductInChartInitAction = () => ({
  type: saveProductInChartInitType,
});

export const saveProductInChartSuccessAction = (charts) => ({
  type: saveProductInChartSuccessType,
  payload: charts
});

export const saveProductInChartAction = async (dispatch,product) => {
  dispatch(saveProductInChartInitAction());
  await sleep(1000);
  const chart = await saveProductInChart(product);
  dispatch(saveProductInChartSuccessAction(chart));
};

export const fetchProductsInitAction = () => ({
  type: fetchProductsInitType,
});

export const fetchProductsSuccessAction = (products) => ({
  type: fetchProductsSuccessType,
  payload: products
});

export const fetchProductsAction = async (dispatch) => {
  dispatch(fetchProductsInitAction());
  const products = await getProducts();
  dispatch(fetchProductsSuccessAction(products));
};

export const deleteProductFromChartInitAction = () => ({
  type: deleteProductFromChartInitType,
});

export const deleteProductFromChartSuccessAction = (charts) => ({
  type: deleteProductFromChartSuccessType,
  payload: charts
});

export const deleteProductFromChartAction = async (dispatch,product,negativeValue) => {
  dispatch(deleteProductFromChartInitAction());
  await sleep(1000);
  const chart = await deleteProductFromChart(product,negativeValue);
  dispatch(deleteProductFromChartSuccessAction(chart));
};

export const deleteChartInitAction = () => ({
  type: deleteChartInitType,
});

export const deleteChartSuccessAction = (charts) => ({
  type: deleteChartSuccessType,
  payload: charts
});

export const deleteChartAction = async (dispatch,chartId) => {
  dispatch(deleteChartInitAction());
  await sleep(1000);
  const charts = await deleteChart(chartId);
  dispatch(deleteChartSuccessAction(charts));
};


export const saveProductsInitAction = () => ({
  type: saveProductsInitType,
});

export const saveProductsSuccessAction = (products) => ({
  type: saveProductsSuccessType,
  payload: products
});

export const saveProductsAction = async (dispatch,productData) => {
  dispatch(saveProductsInitAction());
  await sleep(1000);
  const newProduct = await saveProduct(productData);
  dispatch(saveProductsSuccessAction(newProduct));
};

export const deleteProductInitAction = () => ({
  type: deleteProductInitType,
});

export const deleteProductSuccessAction = (products) => ({
  type: deleteProductSuccessType,
  payload: products
});

export const deleteProductAction = async (dispatch,product) => {
  dispatch(deleteProductInitAction());
  await sleep(1000);
  const products = await deleteProduct(product);
  dispatch(deleteProductSuccessAction(products));
};