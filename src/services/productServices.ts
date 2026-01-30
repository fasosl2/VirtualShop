import { saveChart, getChart } from "./chartServices";
import api from "./apiService";
import type { IChart } from "../interfaces/Chart";
import type { IPaginatedResponse } from "../interfaces/Response";
import type { ApiGetParams } from "../interfaces/Request";
import type { IProduct } from "../interfaces/Product";

export const getProducts = async (opts: ApiGetParams): Promise<IPaginatedResponse<IProduct>> => {
    const res: any = await api.get({ route: "products", params: opts });
    if (!res) return { list: [], total: 0, page: opts.page || 1, pages: 1 };

    const raw: any[] = Array.isArray(res.list) ? res.list : Array.isArray(res) ? res : [];

    const mapped: IProduct[] = raw.map((prod) => ({
      ...prod,
      id: prod["_id"],
      items: typeof prod.items === 'string' && prod.items.length > 0 ? JSON.parse(prod.items) : [],
      endDate: prod?.endDate?.length ? new Date(prod.endDate) : null,
      startDate: prod?.startDate?.length ? new Date(prod.startDate) : null,
    }));

    return { ...res, list: mapped };
};

export const saveProduct = async (productData: IProduct): Promise<IPaginatedResponse<IProduct>> => {
  const dataToSave = { ...productData, items: productData?.items?.length ? JSON.stringify(productData.items) : '[]' };
  if (dataToSave.id) {
    await api.put({ body: dataToSave, route: "products", params: [dataToSave.id] });
  } else {
    await api.post("products", dataToSave);
  }
  return await getProducts({page: 1}); // Assuming default page is 1
};

export const deleteProduct = async (productId: string): Promise<IPaginatedResponse<IProduct>> => {
  await api.delete("products", productId);
  await deleteProductFromChart({ id: productId } as IProduct, 99999999999);
  return await getProducts({page: 1});
};

export const saveProductInChart = async (product: IProduct): Promise<IChart> => {
  const chart: IChart = await getChart();

  if (!chart?.products) {
    return chart;
  }

  const prodIndex = chart.products.findIndex((elem) => elem.id === product.id);

  if (prodIndex !== -1) {
    chart.products[prodIndex].count = (chart.products[prodIndex].count || 0) + 1;
  } else {
    chart.products.push({ ...product, count: 1 });
  }

  await saveChart(chart);
  return { ...chart };
};

export const deleteProductFromChart = async (product: Partial<IProduct>, negativeValue: number): Promise<IChart> => {
  const chart: IChart = await getChart();
  if (!chart || !chart.products) return chart;

  const prodIndex = chart.products.findIndex((elem) => elem.id === product.id);

  if (prodIndex !== -1) {
    const prod = chart.products[prodIndex];
    if(prod.count && prod.count > negativeValue) {
      prod.count -= negativeValue;
    } else {
      chart.products.splice(prodIndex, 1);
    }
  }

  await saveChart(chart);
  return { ...chart };
};
