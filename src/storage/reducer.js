import {
  closeModalsType,
  deleteChartSuccessType,
  deleteProductFromChartSuccessType,
  deleteProductSuccessType,
  fetchChartsSuccessType,
  fetchProductsSuccessType,
  openModalCreateProductType,
  openModalSaveChartType,
  openModalSaveProductType,
  saveChartsSuccessType,
  saveProductInChartSuccessType,
  saveProductsSuccessType,
} from "./types";

export function reducer(state, action) {
  let stateAction = {type: action?.type};

  switch (action?.type) {
    case openModalSaveProductType:
      stateAction.mode = "saveProduct";
      stateAction.activeProductId = action.payload;
      break;
    case openModalSaveChartType:
      stateAction.mode = "createChart";
      break;
    case openModalCreateProductType:
      stateAction.mode = "createProduct";
      break;
    case closeModalsType:
      stateAction.mode = null;
      stateAction.activeProductId = null;
      break;
    case fetchChartsSuccessType:
      stateAction.chart = action.payload;
      break;
    case saveChartsSuccessType:
      stateAction.chart = [...state.chart, action.payload];
      break;
    case saveProductsSuccessType:
      stateAction.products = [...state.products, action.payload];
      break;
    case saveProductInChartSuccessType:
      stateAction.chart = action.payload;
      break;
    case deleteProductFromChartSuccessType:
      stateAction.chart = action.payload;
      break;
      case deleteProductSuccessType:
        stateAction = { ...stateAction, products: action.payload }
        break;
    case deleteChartSuccessType:
      stateAction.chart = action.payload;
      break;
    case fetchProductsSuccessType:
      stateAction.products = [...action.payload];
      break;
    default:
      break;
  }
  return { ...state, ...stateAction };
}
