import type { IPurchase } from "../interfaces/Purchase";
import type { ApiGetParams } from "../interfaces/Request";
import type { IPaginatedResponse } from "../interfaces/Response";
import api from "./apiService";

export const getPurchases = async (opts?: ApiGetParams): Promise<IPaginatedResponse<IPurchase>> => {
  const res: any = await api.get({ route: "purchases", params: opts });
  if (!res) return { list: [], total: 0, page: opts?.page || 1, pages: 1 };

  const raw: any[] = Array.isArray(res.list) ? res.list : Array.isArray(res) ? res : [];
  const mapped: IPurchase[] = raw.map((purchase) => ({
    ...purchase,
    id: purchase["_id"],
  }));

  return { ...res, list: mapped };
};


export const savePurchase = async (purchaseData: Partial<IPurchase>): Promise<IPaginatedResponse<IPurchase>> => {
  if(purchaseData._id){
    await api.put({body: purchaseData, route: "purchases", params: [purchaseData._id]})
  } else {
    await api.post("purchases", purchaseData)
  }
  return await getPurchases();
};

export const deletePurchase = async (purchaseId: string): Promise<IPaginatedResponse<IPurchase>> => {
  await api.delete("purchases", purchaseId);
  //DELETE FROM ALL PRODUCTS
  return await getPurchases();
 };

// export const selectPurchase = (selectedPurchases: IPurchase[], purchase: IPurchase): IPurchase[] => {
//   const purchaseSelected = selectedPurchases.find(ele => ele._id === purchase._id);
//   if(purchaseSelected){
//     purchaseSelected.total += 1;
//     return selectedPurchases;
//   }
//   selectedPurchases.push({id:purchase._id, title: purchase.title, total:1});
//   return selectedPurchases;
// };

export const removePurchase = (selectedPurchases: IPurchase[], purchase: IPurchase, negativeValue: number): IPurchase[] => {
  const purchaseSelected = selectedPurchases.find(ele => ele._id === purchase._id);
  if(purchaseSelected){
    if(purchaseSelected.total > negativeValue){
      purchaseSelected.total -= negativeValue;
    } else {
      const purchaseIndex = selectedPurchases.findIndex(ele => ele._id === purchase._id);
      if(purchaseIndex >= 0){
        selectedPurchases.splice(purchaseIndex,1)
      }
    }
    return selectedPurchases;
  }
  return selectedPurchases;
};
