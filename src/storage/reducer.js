
import {
  authUsersSuccessType,
  closeModalsType,
  deleteChartSuccessType,
  deleteProductsFromChartSuccessType,
  deleteProductsSuccessType,
  deleteUsersSuccessType,
  fetchChartsSuccessType,
  fetchProductsSuccessType,
  fetchUsersSuccessType,
  loginUsersSuccessType,
  logoutUsersSuccessType,
  openModalCreateProductType,
  openModalCreateUserType,
  openModalSaveProductType,
  saveChartsSuccessType,
  saveProductsInChartSuccessType,
  saveProductsSuccessType,
  saveUsersSuccessType,
} from "./types";

export function reducer(state, action) {
  let stateAction = { type: action?.type };

  switch (action?.type) {
    case openModalSaveProductType:
      stateAction.mode = "saveProduct";
      stateAction.activeProduct = action.payload;
      break;
    case openModalCreateProductType:
    case openModalCreateUserType:
      stateAction.mode = action.type;
      stateAction.activeProduct = action.activeProduct;
      break;
    case closeModalsType:
      stateAction.mode = null;
      stateAction.activeProduct = null;
      break;
    case fetchChartsSuccessType:
      stateAction.chart = action.payload;
      break;
    case saveChartsSuccessType:
      stateAction.chart = [...state.chart, action.payload];
      break;
    case deleteChartSuccessType:
      stateAction.chart = action.payload;
      break;
    case saveProductsInChartSuccessType:
      stateAction.chart = action.payload;
      break;
    case saveProductsSuccessType:
      stateAction.products = action.payload;
      break;
    case deleteProductsFromChartSuccessType:
      stateAction.chart = action.payload;
      break;
    case deleteProductsSuccessType:
      stateAction.products= action.payload;
      break;
    case fetchProductsSuccessType:
      stateAction.products = [...action.payload];
      break;
    case fetchUsersSuccessType:
      stateAction.users = [...action.payload];
      break;
    case saveUsersSuccessType:
      stateAction.users = [...state.users, action.payload];
      break;
    case deleteUsersSuccessType:
      stateAction.users = action.payload;
      break;
      case logoutUsersSuccessType:
        stateAction.currentUser = null;
        break;
    case loginUsersSuccessType:
    case authUsersSuccessType:
      stateAction.currentUser = action.payload;
      break;
    default:
      break;
  }
  return { ...state, ...stateAction };
}
