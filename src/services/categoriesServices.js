import api from "./apiService";


export const getCategories = async (opts) => {
    try {
      const response = await api.get({ route: "categories", params: opts });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  };

export const saveCategories = async (categoryData) => {
  if(categoryData.id){
    await api.put({body: categoryData, route: "categories", params: [categoryData.id]})
  } else {
    await api.post("categories", categoryData)
  }
  return await getCategories();
};