import type { IChart } from "../interfaces/Chart";
import { deleteChart, getChart } from "../services/chartServices";
//import { saveProductInChart } from "../services/productServices";
import utilService from "../services/utilService";
import { deleteChartInitType, deleteChartSuccessType, fetchChartsInitType, fetchChartsSuccessType, saveChartsInitType, saveChartsSuccessType } from "../storage/actionConstants";

export const fetchChartsInitAction = () => ({
    type: fetchChartsInitType,
  });
  
  export const fetchChartsSuccessAction = (chart: IChart) => ({
    type: fetchChartsSuccessType,
    payload: chart,
  });
  
  export const fetchChartsAction = async (dispatch) => {
    dispatch(fetchChartsInitAction());
    const chart = await getChart();
    dispatch(fetchChartsSuccessAction(chart));
  };
  
  export const saveChartsInitAction = () => ({
    type: saveChartsInitType,
  });
  
  export const saveChartsSuccessAction = (chart: IChart) => ({
    type: saveChartsSuccessType,
    payload: chart,
  });
  
/*   export const saveChartsAction = async (dispatch, chartName, productId) => {
    dispatch(saveChartsInitAction());
    await utilService.sleep(1000);
    const newChart = await postChart(chartName);
    const resultChart = await saveProductInChart(newChart.id, productId);
    dispatch(saveChartsSuccessAction(resultChart));
  }; */
  
  export const deleteChartInitAction = () => ({
    type: deleteChartInitType,
  });
  
  export const deleteChartSuccessAction = (chart: IChart) => ({
    type: deleteChartSuccessType,
    payload: chart,
  });
  
  export const deleteChartAction = async (dispatch) => {
    dispatch(deleteChartInitAction());
    await utilService.sleep(500);
    const chart = await deleteChart();
    dispatch(deleteChartSuccessAction(chart));
  };