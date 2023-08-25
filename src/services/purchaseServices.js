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
  //DELETE FROM ALL PRODUCTS
  return await getItems();
 };

export const selectItem = async (selectedItems,item) => {
  const itemSelected = selectedItems.find(ele => ele.id === item.id);
  if(itemSelected){
    itemSelected.total += 1;
    return selectedItems;
  }
  selectedItems.push({id:item.id, title: item.title, total:1});
  return selectedItems;
};

export const removeItem = async (selectedItems,item,negativeValue) => {
  const itemSelected = selectedItems.find(ele => ele.id === item.id);
  if(itemSelected){
    if(itemSelected.total > negativeValue){
      itemSelected.total -= negativeValue;
    } else {
      const itemIndex = selectedItems.findIndex(ele => ele.id === item.id);
      if(itemIndex >= 0){
        selectedItems.splice(itemIndex,1)
      }
    }
    return selectedItems;
  }
  return selectedItems;
};