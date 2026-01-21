import { deleteChart, getChart, postChart } from "../services/chartServices";
import { saveProductInChart } from "../services/productServices";
import utilService from "../services/utilService";
import { deleteChartInitType, deleteChartSuccessType, fetchChartsInitType, fetchChartsSuccessType, saveChartsInitType, saveChartsSuccessType } from "../storage/types";

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
    await utilService.sleep(1000);
    const newChart = await postChart(chartName);
    const resultChart = await saveProductInChart(newChart.id, productId);
    dispatch(saveChartsSuccessAction(resultChart));
  };
  
  export const deleteChartInitAction = () => ({
    type: deleteChartInitType,
  });
  
  export const deleteChartSuccessAction = (charts) => ({
    type: deleteChartSuccessType,
    payload: charts,
  });
  
  export const deleteChartAction = async (dispatch) => {
    dispatch(deleteChartInitAction());
    await utilService.sleep(500);
    const charts = await deleteChart();
    dispatch(deleteChartSuccessAction(charts));
  };