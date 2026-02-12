import type { IItem, SelectedItem } from "../interfaces/Item";
import api from "./apiService";



export const getItems = async (): Promise<IItem[]> => {
  return await api.read({route: "items"}) as IItem[];
};

export const saveItem = async (itemData: IItem): Promise<IItem[]> => {
  if(itemData._id){
    await api.put({body: itemData, route: "items", params: [itemData._id]})
  } else {
    await api.post("items", itemData)
  }
  return await getItems();
};

export const deleteItem = async (itemId: string): Promise<IItem[]> => {
  await api.delete("items", itemId);
  //DELETE FROM ALL PRODUCTS
  return await getItems();
 };

export const selectItem = (selectedItems: SelectedItem[], item: IItem): SelectedItem[] => {
  const itemSelected = selectedItems.find(ele => ele._id === item._id);
  if(itemSelected){
    itemSelected.total += 1;
    return selectedItems;
  }
  if(item._id){
    selectedItems.push({_id: item._id, title: item.title, total:1});
  }
  return selectedItems;
};

export const removeItem = (selectedItems: SelectedItem[], item: IItem, negativeValue: number): SelectedItem[] => {
  const itemSelected = selectedItems.find(ele => ele._id === item._id);
  if(itemSelected){
    if(itemSelected.total > negativeValue){
      itemSelected.total -= negativeValue;
    } else {
      const itemIndex = selectedItems.findIndex(ele => ele._id === item._id);
      if(itemIndex >= 0){
        selectedItems.splice(itemIndex,1)
      }
    }
    return selectedItems;
  }
  return selectedItems;
};
