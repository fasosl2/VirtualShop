import type { IChart } from "../interfaces/Chart";
import { getStoredTable, saveStoredTable } from "./localStorageAPI";

export const getChart = async (): Promise<IChart> => {
  const chart: IChart = await getStoredTable("chart",{
    products: [],
  });
  return chart;
};

export const saveChart = async (chart: IChart): Promise<void> => {
  await saveStoredTable(chart, "chart");
};

export const deleteChart = async (): Promise<IChart> => {
  const chart: IChart = {
    products: []
  };
  await saveChart(chart);
  return chart;
};
