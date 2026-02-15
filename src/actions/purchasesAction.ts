import {
  deletePurchase,
  getPurchases,
  savePurchase,
} from "../services/purchaseServices";
import utilService from "../services/utilService";
import React from "react";
import type { IPurchase } from "../interfaces/Purchase";

import {
  deletePurchasesInitType,
  deletePurchasesSuccessType,
  fetchPurchasesInitType,
  fetchPurchasesSuccessType,
  savePurchasesInitType,
  savePurchasesSuccessType,
} from "../storage/actionConstants";
import type { IPaginatedResponse } from "../interfaces/Response";

interface Action {
  type: string;
  payload?: any;
}

export const fetchPurchasesInitAction = () => ({
  type: fetchPurchasesInitType,
});

export const fetchPurchasesSuccessAction = (purchases: IPaginatedResponse<IPurchase>) => ({
  type: fetchPurchasesSuccessType,
  payload: purchases,
});

export const fetchPurchasesAction = async (
  dispatch: React.Dispatch<Action>,
  opts?: any
) => {
  dispatch(fetchPurchasesInitAction());
  const purchases = await getPurchases(opts);
  dispatch(fetchPurchasesSuccessAction(purchases));
};

export const savePurchasesInitAction = () => ({
  type: savePurchasesInitType,
});

export const savePurchasesSuccessAction = (purchase: IPaginatedResponse<IPurchase>) => ({
  type: savePurchasesSuccessType,
  payload: purchase,
});

export const savePurchasesAction = async (
  dispatch: React.Dispatch<Action>,
  purchaseData: IPurchase
) => {
  dispatch(savePurchasesInitAction());
  await utilService.sleep(1000);
  const newPurchase = await savePurchase(purchaseData);
  dispatch(savePurchasesSuccessAction(newPurchase));
};

export const deletePurchaseInitAction = () => ({
  type: deletePurchasesInitType,
});

export const deletePurchaseSuccessAction = (purchases: IPaginatedResponse<IPurchase>) => ({
  type: deletePurchasesSuccessType,
  payload: purchases,
});

export const deletePurchaseAction = async (
  dispatch: React.Dispatch<Action>,
  purchaseId: string
) => {
  dispatch(deletePurchaseInitAction());
  await utilService.sleep(1000);
  const purchases = await deletePurchase(purchaseId);
  dispatch(deletePurchaseSuccessAction(purchases));
};
