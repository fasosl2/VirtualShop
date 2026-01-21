import api from "./apiService";

export const getPurchases = async (opts) => {
  const res = await api.get({ route: "purchases", params: opts });
  if (!res) return { list: [], total: 0, page: opts?.page || 1, pages: 1 };

  const raw = Array.isArray(res.list) ? res.list : Array.isArray(res) ? res : [];
  const mapped = raw.map((purchase) => ({
    ...purchase,
    id: purchase["_id"],
  }));

  return { ...res, list: mapped };
};


export const savePurchase = async (purchaseData) => {
  if(purchaseData.id){
    await api.put({body: purchaseData, route: "purchases", params: [purchaseData.id]})
  } else {
    await api.post("purchases", purchaseData)
  }
  return await getPurchases();
};

export const deletePurchase = async (purchaseId) => {
  await api.delete("purchases", purchaseId);
  //DELETE FROM ALL PRODUCTS
  return await getPurchases();
 };

export const selectPurchase = async (selectedPurchases,purchase) => {
  const purchaseSelected = selectedPurchases.find(ele => ele.id === purchase.id);
  if(purchaseSelected){
    purchaseSelected.total += 1;
    return selectedPurchases;
  }
  selectedPurchases.push({id:purchase.id, title: purchase.title, total:1});
  return selectedPurchases;
};

export const removePurchase = async (selectedPurchases,purchase,negativeValue) => {
  const purchaseSelected = selectedPurchases.find(ele => ele.id === purchase.id);
  if(purchaseSelected){
    if(purchaseSelected.total > negativeValue){
      purchaseSelected.total -= negativeValue;
    } else {
      const purchaseIndex = selectedPurchases.findIndex(ele => ele.id === purchase.id);
      if(purchaseIndex >= 0){
        selectedPurchases.splice(purchaseIndex,1)
      }
    }
    return selectedPurchases;
  }
  return selectedPurchases;
};