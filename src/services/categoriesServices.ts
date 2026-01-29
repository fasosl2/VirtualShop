import api from "./apiService";
import type { ICategory } from "../interfaces/Category";
import type { IPaginatedResponse } from "../interfaces/Response";

export const getCategories = async (opts?: Record<string, any>): Promise<IPaginatedResponse<ICategory>> => {
    try {
      const response = await api.get({ route: "categories", params: opts });
      return response;
    } catch (e: any) {
      throw new Error(e);
    }
  };

export const saveCategories = async (categoryData: ICategory): Promise<IPaginatedResponse<ICategory>> => {
  if(categoryData.id){
    await api.put({body: categoryData, route: "categories", params: [categoryData.id]})
  } else {
    await api.post("categories", categoryData)
  }
  return await getCategories();
};
