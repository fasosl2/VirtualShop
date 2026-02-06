import {
  authUsersSuccessType,
  closeModalsType,
  deleteChartSuccessType,
  deleteItemsSuccessType,
  deleteProductsFromChartSuccessType,
  deleteProductsSuccessType,
  deleteUsersSuccessType,
  fetchChartsSuccessType,
  fetchItemsSuccessType,
  fetchProductsSuccessType,
  fetchUsersSuccessType,
  loginUsersSuccessType,
  fetchCategoriesSuccessType,
  logoutUsersSuccessType,
  openModalCreateItemType,
  openModalCreateProductType,
  openModalCreateUserType,
  openModalSaveItemsType,
  removeItemsSuccessType,
  selectItemsSuccessType,
  saveChartsSuccessType,
  saveItemsSuccessType,
  saveProductsInChartSuccessType,
  saveProductsSuccessType,
  saveCategoriesSuccessType,
  saveUsersSuccessType,
  savePurchasesSuccessType,
  fetchPurchasesSuccessType,
  deletePurchasesSuccessType,
  openModalBuyProductType,
  saveCalendarsSuccessType,
  deleteCalendarsSuccessType,
  fetchCalendarsSuccessType,
  openModalCreateCalendarType,
  openModalCreatePurchaseType,
  openModalCreateCategoriesType,
  fetchPurchasesInitType,
  fetchProductsInitType,
  fetchUsersInitType,
  fetchCategoriesInitType
} from "./actionConstants";

import type { AppState, IAction } from "../interfaces/Context";

export function reducer(state: AppState, action: IAction) {
  let stateAction : IAction = { type: action?.type };

  switch (action?.type) {
    case openModalSaveItemsType:
      stateAction.mode = openModalSaveItemsType;
      state.selectedItems = action.selectedItems;
      break;
    case openModalCreateProductType:
      stateAction.mode = action.type;
      stateAction.activeProduct = action.activeProduct;
      break;
    case openModalBuyProductType:
      stateAction.mode = action.type;
      stateAction.activeProduct = action.activeProduct;
      break;
    case openModalCreateItemType:
      stateAction.mode = action.type;
      stateAction.activeItem = action.activeItem;
      break;
    case openModalCreateCalendarType:
      stateAction.mode = action.type;
      stateAction.activeCalendar = action.activeCalendar;
      break;
    case openModalCreatePurchaseType:
      stateAction.mode = action.type;
      stateAction.activePurchase = action.activePurchase;
      break;
    case openModalCreateCategoriesType:
      stateAction.mode = action.type;
      //stateAction.activeCategory = action.activeCategory;
      break;
    case openModalCreateUserType:
      stateAction.mode = action.type;
      stateAction.activeUser = action.activeUser;
      break;
    case closeModalsType:
      stateAction.mode = null;
      stateAction.activeProduct = null;
      stateAction.activeUser = null;
      stateAction.activeItem = null;
      stateAction.activeCalendar = null;
      stateAction.activePurchase = null;
      stateAction.selectedItems = [];
      break;
    case fetchChartsSuccessType:
      stateAction.chart = action.payload;
      break;
    case saveChartsSuccessType:
      stateAction.chart = {...state.chart/* , action.payload */};
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
      stateAction.products = action.payload;
      break;
    case saveUsersSuccessType:
      stateAction.users = action.payload;
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
    case saveItemsSuccessType:
      stateAction.items = action.payload;
      break;
    case selectItemsSuccessType:
      stateAction.selectedItems = action.payload;
      break;
    case removeItemsSuccessType:
      stateAction.selectedItems = action.payload;
      break;
    case deleteItemsSuccessType:
      stateAction.items = action.payload;
      break;
    case fetchItemsSuccessType:
      stateAction.items = [...action.payload];
      break;
    case savePurchasesSuccessType:
      stateAction.purchases = action.payload;
      break;
    case deletePurchasesSuccessType:
      stateAction.purchases = action.payload;
      break;
    case fetchPurchasesInitType:
    case fetchProductsInitType:
    case fetchUsersInitType:
    case fetchCategoriesInitType:
      stateAction.isLoading = state.isLoading + 1;
      break;
    case fetchPurchasesSuccessType:
      stateAction.purchases = {...action.payload};
      stateAction.isLoading = state.isLoading - 1;
      break;
    case fetchProductsSuccessType:
      stateAction.products = { ...action.payload };
      stateAction.isLoading = state.isLoading - 1;
      break;
    case fetchCategoriesSuccessType:
      stateAction.categories = { ...action.payload };
      stateAction.isLoading = state.isLoading - 1;
      break;
    case fetchUsersSuccessType:
      stateAction.users = { ...action.payload };
      stateAction.isLoading = state.isLoading - 1;
      break;
    case saveCalendarsSuccessType:
      stateAction.calendars = action.payload;
      break;
    case deleteCalendarsSuccessType:
      stateAction.calendars = action.payload;
      break;
    case fetchCalendarsSuccessType:
      stateAction.calendars = [...action.payload];
      break;
      case saveCategoriesSuccessType:
        stateAction.categories = action.payload;
        break;
    default:
      break;
  }
  return { ...state, ...stateAction };
}
