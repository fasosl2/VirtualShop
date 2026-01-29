import type { Item, SelectedItem } from "../interfaces/Item";
import api from "./apiService";



export const getItems = async (): Promise<Item[]> => {
  return await api.read({route: "items"}) as Item[];
};

export const saveItem = async (itemData: Item): Promise<Item[]> => {
  if(itemData.id){
    await api.put({body: itemData, route: "items", params: [itemData.id]})
  } else {
    await api.post("items", itemData)
  }
  return await getItems();
};

export const deleteItem = async (itemId: string): Promise<Item[]> => {
  await api.delete("items", itemId);
  //DELETE FROM ALL PRODUCTS
  return await getItems();
 };

export const selectItem = (selectedItems: SelectedItem[], item: Item): SelectedItem[] => {
  const itemSelected = selectedItems.find(ele => ele.id === item.id);
  if(itemSelected){
    itemSelected.total += 1;
    return selectedItems;
  }
  if(item.id){
    selectedItems.push({id: item.id, title: item.title, total:1});
  }
  return selectedItems;
};

export const removeItem = (selectedItems: SelectedItem[], item: Item, negativeValue: number): SelectedItem[] => {
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
