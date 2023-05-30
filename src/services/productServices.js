import { saveChart, getChart } from "./chartServices";
import api from "./apiService";

export const getProducts = async () => {
  const result = await api.read({route: "products"});
  return  result.map(prod => ({...prod, items: prod?.items?.length ? JSON.parse(prod.items) : []}));
};

export const saveProduct = async (productData) => {
  productData = {...productData, items: productData?.items?.length ? JSON.stringify(productData.items) : '[]'};
  if(productData.id){
    await api.put({body: productData, route: "products", params: [productData.id]})
  } else {
    await api.post("products", productData)
  }
  return await getProducts();
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