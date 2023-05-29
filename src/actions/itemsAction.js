import { deleteItem, deleteItemFromProduct, getItems, saveItem, saveItemInProduct } from "../services/itemServices";
import { sleep } from "../storage/actions";
import { deleteItemsFromProductInitType, deleteItemsFromProductSuccessType, deleteItemsInitType, deleteItemsSuccessType, fetchItemsInitType, fetchItemsSuccessType, saveItemsInProductInitType, saveItemsInProductSuccessType, saveItemsInitType, saveItemsSuccessType } from "../storage/types";

export const saveItemsInProductInitAction = () => ({
    type: saveItemsInProductInitType,
  });
  
  export const saveItemsInProductSuccessAction = (products) => ({
    type: saveItemsInProductSuccessType,
    payload: products,
  });
  
  export const saveItemsInProductAction = async (dispatch, item) => {
    dispatch(saveItemsInProductInitAction());
    await sleep(100);
    const product = await saveItemInProduct(item);
    dispatch(saveItemsInProductSuccessAction(product));
  };
  
  export const deleteItemsFromProductInitAction = () => ({
    type: deleteItemsFromProductInitType,
  });
  
  export const deleteItemsFromProductSuccessAction = (products) => ({
    type: deleteItemsFromProductSuccessType,
    payload: products,
  });
  
  export const deleteItemsFromProductAction = async (
    dispatch,
    item,
    negativeValue
  ) => {
    dispatch(deleteItemsFromProductInitAction());
    const product = await deleteItemFromProduct(item, negativeValue);
    await sleep(100);
    dispatch(deleteItemsFromProductSuccessAction(product));
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
    await sleep(1000);
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
    await sleep(1000);
    const items = await deleteItem(item);
    dispatch(deleteItemSuccessAction(items));
  };
  