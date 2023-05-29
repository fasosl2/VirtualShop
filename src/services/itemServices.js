import api from "./apiService";

export const getItems = async () => {
  return await api.read({route: "items"});
};

export const saveItem = async (itemData) => {
  if(itemData.id){
    await api.put({body: itemData, route: "items", params: [itemData.id]})
  } else {
    await api.post("items", itemData)
  }
  return await getItems();
};

export const deleteItem = async (itemId) => {
  await api.delete("items", itemId);
  await deleteItemFromProduct({id:itemId},99999999999);
  return await getItems();
 };

export const saveItemInProduct = async (item) => {
  
};

export const deleteItemFromProduct = async (item, negativeValue) => {
  
};