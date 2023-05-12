import { saveChart, getChart } from "./chartServices";
import {saveStoredTable} from "./localStorageAPI";

export const getProducts = async () => {
  
  let requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  const products = fetch(process.env.REACT_APP_API + "products", requestOptions)
    .then((response) => response.json())
    .then((productList) => productList.map(ele => ({...ele,id:ele['_id']})));
  return await products;
};

export const saveProducts = async (products) => {
  await saveStoredTable(products, "products");
};

export const saveProduct = async (productData) => {

  const newProduct = {
    image: "https://picsum.photos/200/200?" + Math.floor(Math.random() * 100),
    ...productData
  };

  let requestOptions = {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify(newProduct)
 };
 await fetch("https://base-api.glitch.me/api/products", requestOptions)
   .then((response) => response.json());
  return newProduct;
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

export const deleteProduct = async (productId) => {

   let requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  };
  await fetch("https://base-api.glitch.me/api/products/" + productId, requestOptions)
    .then((response) => response.json());
  await deleteProductFromChart({id:productId},99999999999);
   return await getProducts();
 };