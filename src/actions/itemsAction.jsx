import {
  deleteItem,
  getItems,
  removeItem,
  saveItem,
  selectItem,
  } from "../services/itemServices";
import utilService from "../services/utilService";

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
} from "../storage/types";

export const removeItemsInitAction = () => ({
  type: removeItemsInitType,
});

export const removeItemsSuccessAction = (items) => ({
  type: removeItemsSuccessType,
  payload: items,
});

export const removeItemsAction = async ({dispatch,selectedItems,item,negativeValue}) => {
  dispatch(removeItemsInitAction());
  const items = await removeItem(selectedItems,item,negativeValue);
  dispatch(removeItemsSuccessAction(items));
};

export const selecttemsInitAction = () => ({
  type: selectItemsInitType,
});

export const selectItemsSuccessAction = (items) => ({
  type: selectItemsSuccessType,
  payload: items,
});

export const selectItemsAction = async ({dispatch,selectedItems,item}) => {
  dispatch(selecttemsInitAction());
  const items = await selectItem(selectedItems,item);
  dispatch(selectItemsSuccessAction(items));
};

export const fetchItemsInitAction = () => ({
  type: fetchItemsInitType,
});

export const fetchItemsSuccessAction = (items) => ({
  type: fetchItemsSuccessType,
  payload: items,
});

export const fetchItemsAction = async (dispatch) => {
  dispatch(fetchItemsInitAction());
  const items = await getItems();
  dispatch(fetchItemsSuccessAction(items));
};

export const saveItemsInitAction = () => ({
  type: saveItemsInitType,
});

export const saveItemsSuccessAction = (items) => ({
  type: saveItemsSuccessType,
  payload: items,
});

export const saveItemsAction = async (dispatch, itemData) => {
  dispatch(saveItemsInitAction());
  await utilService.sleep(1000);
  const newItem = await saveItem(itemData);
  dispatch(saveItemsSuccessAction(newItem));
};

export const deleteItemInitAction = () => ({
  type: deleteItemsInitType,
});

export const deleteItemSuccessAction = (items) => ({
  type: deleteItemsSuccessType,
  payload: items,
});

export const deleteItemAction = async (dispatch, item) => {
  dispatch(deleteItemInitAction());
  await utilService.sleep(1000);
  const items = await deleteItem(item);
  dispatch(deleteItemSuccessAction(items));
};
