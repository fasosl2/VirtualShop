import { saveChart, getChart } from "./chartServices";
import api from "./apiService";

export const getProducts = async () => {
  return await api.read({route: "products"});
};

export const saveProduct = async (productData) => {
  await api.post("products", productData)
  return productData;
};

export const deleteProduct = async (productId) => {
  await api.delete("products", productId);
  await deleteProductFromChart({id:productId},99999999999);
  return await getProducts();
 };

export const saveProductInChart = async (product) => {
  const chart = await getChart();
  var prod = chart?.products.find((elem) => elem.id === product.id);
  prod ? prod.count++ : chart && chart.products.push({ ...product, count: 1 });
  await saveChart(chart);
  return chart ? { ...chart } : {};
};

export const deleteProductFromChart = async (product, negativeValue) => {
  const chart = await getChart();
  var prodIndex = chart?.products?.findIndex((elem) => elem.id === product.id);
  if (chart?.products?.length && prodIndex != null && prodIndex !== -1) {
    chart.products[prodIndex].count > negativeValue
      ? (chart.products[prodIndex].count -= negativeValue)
      : chart && chart?.products.splice(prodIndex, 1);
  }

  await saveChart(chart);
  return chart ? { ...chart } : {};
};