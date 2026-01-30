import {
  deleteItem,
  getItems,
  removeItem,
  saveItem,
  selectItem,
} from "../services/itemServices";
import utilService from "../services/utilService";
import React from "react";
import type { Item, SelectedItem } from "../interfaces/Item";
import type { IAction } from "../interfaces/AppState";

import {
  deleteItemsInitType,
  deleteItemsSuccessType,
  fetchItemsInitType,
  fetchItemsSuccessType,
  removeItemsInitType,
  removeItemsSuccessType,
  saveItemsInitType,
  saveItemsSuccessType,
  selectItemsInitType,
  selectItemsSuccessType,
} from "../storage/actionConstants";


export const removeItemsInitAction = () => ({
  type: removeItemsInitType,
});

export const removeItemsSuccessAction = (items: SelectedItem[]) => ({
  type: removeItemsSuccessType,
  payload: items,
});


export const removeItemsAction = async ({
  dispatch,
  selectedItems,
  item,
  negativeValue,
}) => {
  dispatch(removeItemsInitAction());
  const items = await removeItem(selectedItems, item, negativeValue);
  dispatch(removeItemsSuccessAction(items));
};

export const selecttemsInitAction = () => ({
  type: selectItemsInitType,
});

export const selectItemsSuccessAction = (items: SelectedItem[]) => ({
  type: selectItemsSuccessType,
  payload: items,
});

interface SelectItemsParams {
  dispatch: React.Dispatch<IAction>;
  selectedItems: SelectedItem[];
  item: Item;
}

export const selectItemsAction = async ({
  dispatch,
  selectedItems,
  item,
}: SelectItemsParams) => {
  dispatch(selecttemsInitAction());
  const items = await selectItem(selectedItems, item);
  dispatch(selectItemsSuccessAction(items));
};

export const fetchItemsInitAction = () => ({
  type: fetchItemsInitType,
});

export const fetchItemsSuccessAction = (items: Item[]) => ({
  type: fetchItemsSuccessType,
  payload: items,
});

export const fetchItemsAction = async (dispatch: React.Dispatch<IAction>) => {
  dispatch(fetchItemsInitAction());
  const items = await getItems();
  dispatch(fetchItemsSuccessAction(items));
};

export const saveItemsInitAction = () => ({
  type: saveItemsInitType,
});

export const saveItemsSuccessAction = (item: Item[]) => ({
  type: saveItemsSuccessType,
  payload: item,
});

export const saveItemsAction = async (
  dispatch: React.Dispatch<IAction>,
  itemData: Item
) => {
  dispatch(saveItemsInitAction());
  await utilService.sleep(1000);
  const newItem = await saveItem(itemData);
  dispatch(saveItemsSuccessAction(newItem));
};

export const deleteItemInitAction = () => ({
  type: deleteItemsInitType,
});

export const deleteItemSuccessAction = (items: Item[]) => ({
  type: deleteItemsSuccessType,
  payload: items,
});

export const deleteItemAction = async (
  dispatch: React.Dispatch<IAction>,
  itemId: string
) => {
  dispatch(deleteItemInitAction());
  await utilService.sleep(1000);
  const items = await deleteItem(itemId);
  dispatch(deleteItemSuccessAction(items));
};
