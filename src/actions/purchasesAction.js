import {
  deletePurchase,
  getPurchases,
  removePurchase,
  savePurchase,
  selectPurchase,
  } from "../services/purchaseServices";
import utilService from "../services/utilService";

import {
  deletePurchasesInitType,
  deletePurchasesSuccessType,
  fetchPurchasesInitType,
  fetchPurchasesSuccessType,
  savePurchasesInitType,
  savePurchasesSuccessType,
} from "../storage/types";

export const fetchPurchasesInitAction = () => ({
  type: fetchPurchasesInitType,
});

export const fetchPurchasesSuccessAction = (purchases) => ({
  type: fetchPurchasesSuccessType,
  payload: purchases,
});

export const fetchPurchasesAction = async (dispatch) => {
  dispatch(fetchPurchasesInitAction());
  const purchases = await getPurchases();
  dispatch(fetchPurchasesSuccessAction(purchases));
};

export const savePurchasesInitAction = () => ({
  type: savePurchasesInitType,
});

export const savePurchasesSuccessAction = (purchases) => ({
  type: savePurchasesSuccessType,
  payload: purchases,
});

export const savePurchasesAction = async (dispatch, purchaseData) => {
  dispatch(savePurchasesInitAction());
  await utilService.sleep(1000);
  const newPurchase = await savePurchase(purchaseData);
  dispatch(savePurchasesSuccessAction(newPurchase));
};

export const deletePurchaseInitAction = () => ({
  type: deletePurchasesInitType,
});

export const deletePurchaseSuccessAction = (purchases) => ({
  type: deletePurchasesSuccessType,
  payload: purchases,
});

export const deletePurchaseAction = async (dispatch, purchase) => {
  dispatch(deletePurchaseInitAction());
  await utilService.sleep(1000);
  const purchases = await deletePurchase(purchase);
  dispatch(deletePurchaseSuccessAction(purchases));
};
