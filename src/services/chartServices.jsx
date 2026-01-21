import { getStoredTable, /* generateId, */ saveStoredTable } from "./localStorageAPI";

export const postChart = async () => {
  var chart = await getChart();

  //const id = generateId(chart);

  const newChart = {
    // id: id,
    products: [],
  };

  chart.push(newChart);
  await saveStoredTable(chart, "chart");
  return newChart;
};

export const getChart = async () => {
  const chart = await getStoredTable("chart",{
    //id: id,
    products: [],
  });
  return chart;
};

export const saveChart = async (chart) => {
  await saveStoredTable(chart, "chart");
};

export const deleteChart = async () => {
  const chart = {
    products: []
  };
  await saveChart(chart);
  return chart;
};
