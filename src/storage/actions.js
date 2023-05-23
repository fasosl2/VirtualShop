import {
  deleteProduct,
  deleteProductFromChart as deleteProductsFromChart,
  getProducts,
  saveProduct,
  saveProductInChart,
} from "../services/productServices";
import { deleteChart, getChart, postChart } from "../services/chartServices";
import {
  authUsersInitType,
  authUsersSuccessType,
  closeModalsType,
  deleteChartInitType,
  deleteChartSuccessType,
  deleteProductsFromChartInitType,
  deleteProductsFromChartSuccessType,
  deleteProductsInitType,
  deleteProductsSuccessType,
  deleteUsersInitType,
  deleteUsersSuccessType,
  fetchChartsInitType,
  fetchChartsSuccessType,
  fetchProductsInitType,
  fetchProductsSuccessType,
  fetchUsersInitType,
  fetchUsersSuccessType,
  loginUsersInitType,
  loginUsersSuccessType,
  logoutUsersInitType,
  logoutUsersSuccessType,
  openModalCreateProductType,
  openModalCreateUserType,
  openModalSaveChartType,
  openModalSaveProductType,
  saveChartsInitType,
  saveChartsSuccessType,
  saveProductsInChartInitType,
  saveProductsInChartSuccessType,
  saveProductsInitType,
  saveProductsSuccessType,
  saveUsersInitType,
  saveUsersSuccessType,
} from "./types";
import {
  deleteUser,
  getUsers,
  saveUser,
  userAuth,
  userLogin,
  userLogout,
} from "../services/userServices";

export const sleep = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });
  export const openModalCreateProductAction = () => ({
    type: openModalCreateProductType,
  });
  export const openModalCreateUserAction = () => ({
    type: openModalCreateUserType,
  });
export const openModalSaveProductAction = (productId) => ({
  type: openModalSaveProductType,
  payload: productId,
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
  payload: charts,
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
  payload: charts,
});

export const saveChartsAction = async (dispatch, chartName, productId) => {
  dispatch(saveChartsInitAction());
  await sleep(1000);
  const newChart = await postChart(chartName);
  const resultChart = await saveProductInChart(newChart.id, productId);
  dispatch(saveChartsSuccessAction(resultChart));
};

export const saveProductsInChartInitAction = () => ({
  type: saveProductsInChartInitType,
});

export const saveProductsInChartSuccessAction = (charts) => ({
  type: saveProductsInChartSuccessType,
  payload: charts,
});

export const saveProductsInChartAction = async (dispatch, product) => {
  dispatch(saveProductsInChartInitAction());
  await sleep(100);
  const chart = await saveProductInChart(product);
  dispatch(saveProductsInChartSuccessAction(chart));
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
  await sleep(100);
  dispatch(deleteProductsFromChartSuccessAction(chart));
};

export const deleteChartInitAction = () => ({
  type: deleteChartInitType,
});

export const deleteChartSuccessAction = (charts) => ({
  type: deleteChartSuccessType,
  payload: charts,
});

export const deleteChartAction = async (dispatch, chartId) => {
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
  payload: products,
});

export const saveProductsAction = async (dispatch, productData) => {
  dispatch(saveProductsInitAction());
  await sleep(1000);
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
  await sleep(1000);
  const products = await deleteProduct(product);
  dispatch(deleteProductSuccessAction(products));
};

export const fetchUsersInitAction = () => ({
  type: fetchUsersInitType,
});

export const fetchUsersSuccessAction = (users) => ({
  type: fetchUsersSuccessType,
  payload: users,
});

export const fetchUsersAction = async (dispatch) => {
  dispatch(fetchUsersInitAction());
  const users = await getUsers();
  dispatch(fetchUsersSuccessAction(users));
};
export const saveUsersInitAction = () => ({
  type: saveUsersInitType,
});

export const saveUsersSuccessAction = (users) => ({
  type: saveUsersSuccessType,
  payload: users,
});

export const saveUsersAction = async (dispatch, userData) => {
  dispatch(saveUsersInitAction());
  await sleep(1000);
  const newUser = await saveUser(userData);
  dispatch(saveUsersSuccessAction(newUser));
};

export const deleteUsersInitAction = () => ({
  type: deleteUsersInitType,
});

export const deleteUsersSuccessAction = (users) => ({
  type: deleteUsersSuccessType,
  payload: users,
});

export const deleteUserAction = async (dispatch, user) => {
  dispatch(deleteUsersInitAction());
  await sleep(1000);
  const users = await deleteUser(user);
  dispatch(deleteUsersSuccessAction(users));
};

export const authUsersInitAction = () => ({
  type: authUsersInitType,
});

export const authUsersSuccessAction = (users) => ({
  type: authUsersSuccessType,
  payload: users,
});

export const authUsersAction = async (dispatch) => {
  dispatch(authUsersInitAction());
  await sleep(50);
  const users = await userAuth();
  dispatch(authUsersSuccessAction(users));
};

export const loginUsersInitAction = () => ({
  type: loginUsersInitType,
});

export const loginUsersSuccessAction = (users) => ({
  type: loginUsersSuccessType,
  payload: users,
});

export const loginUsersAction = async (dispatch, user) => {
  dispatch(loginUsersInitAction());
  await sleep(1000);
  const users = await userLogin(user);
  dispatch(loginUsersSuccessAction(users));
};

export const logoutUsersInitAction = () => ({
  type: logoutUsersInitType,
});

export const logoutUsersSuccessAction = (users) => ({
  type: logoutUsersSuccessType,
  payload: users,
});

export const logoutUsersAction = async (dispatch) => {
  dispatch(logoutUsersInitAction());
  await sleep(1000);
  const users = await userLogout();
  dispatch(logoutUsersSuccessAction(users));
};
