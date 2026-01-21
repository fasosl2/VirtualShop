import { saveChart, getChart } from "./chartServices";
import api from "./apiService";

export const getProducts = async (opts) => {
    const res = await api.get({ route: "products", params: opts });
    if (!res) return { list: [], total: 0, page: opts.page || 1, pages: 1 };

    const raw = Array.isArray(res.list) ? res.list : Array.isArray(res) ? res : [];

    const mapped = raw.map((prod) => ({
      ...prod,
      id: prod["_id"],
      items: prod?.items?.length ? JSON.parse(prod.items) : [],
      endDate: prod?.endDate?.length ? new Date(prod.endDate) : null,
      startDate: prod?.startDate?.length ? new Date(prod.startDate) : null,
    }));

    return { ...res, list: mapped };
};

export const saveProduct = async (productData) => {
  productData = { ...productData, items: productData?.items?.length ? JSON.stringify(productData.items) : '[]' };
  if (productData.id) {
    await api.put({ body: productData, route: "products", params: [productData.id] });
  } else {
    await api.post("products", productData);
  }
  return await getProducts();
};

export const deleteProduct = async (productId) => {
  await api.delete("products", productId);
  await deleteProductFromChart({ id: productId }, 99999999999);
  return await getProducts();
};

export const saveProductInChart = async (product) => {
  const chart = await getChart();
  var prod = chart?.products.find((elem) => elem.id === product.id);
  prod ? prod.count++ : chart && chart.products.push({ ...product, count: 1 });
  //chart.products = [product];
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