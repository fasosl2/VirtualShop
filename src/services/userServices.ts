import type { ApiGetParams } from "../interfaces/Request";
import type { IPaginatedResponse } from "../interfaces/Response";
import api from "./apiService";
import { getStoredItem, setStoredItem } from "./localStorageAPI";
import type { IUser, ILoginData, IUserToken } from "../interfaces/User";

export const getUsers = async (opts?: ApiGetParams): Promise<IPaginatedResponse<IUser>> => {
  const res: any = await api.get({ route: "users", params: opts });
  if (!res) return { list: [], total: 0, page: opts?.page || 1, pages: 1 };

  const raw: any[] = Array.isArray(res.list) ? res.list : Array.isArray(res) ? res : [];
  const mapped: IUser[] = raw.map((user) => ({
    ...user,
    id: user["_id"],
  }));

  return { ...res, list: mapped };
};

export const saveUser = async (userData: Partial<IUser>): Promise<IPaginatedResponse<IUser>> => {
  if(userData.id){
    await api.put({body: userData, route: "users", params: [userData.id]})
  } else {
    await api.post("users", userData)
  }
  return await getUsers();
};

export const deleteUser = async (userId: string): Promise<IPaginatedResponse<IUser>> => {
  await api.delete("users", userId);
  return await getUsers();
 };
 
 export const getUserToken = async (): Promise<IUserToken | null> => {
  return await getStoredItem("user") || null;
 }
 
 export const setUserToken = async (token: IUserToken | null): Promise<void> => {
  return await setStoredItem("user",token);
 }

export const userLogin = async (loginData: ILoginData): Promise<IUser | {error: string}> => {
  if (!loginData.email || !loginData.password) return {error: 'Email and password are required'};
  const response: any = await api.get({route: "users/login", params: [loginData.email,loginData.password]});
  if (response?.auth){
    await setUserToken({...response.user, token: response.token});
    return response.user;
  }
  return {error: 'falha no login!'}
};

export const userLogout = async (): Promise<{error: string} | null> => {
  const response: any = await api.get({ route: "logout" });
  if (response?.auth === false){
    await setUserToken(null);
    return null;
  }
  return {error: 'falha no logout!'}
};

export const userAuth = async (): Promise<IUserToken | null> => {
  const user = await getUserToken();
  if(!user){
    return null;
  }
  //const response = await api.get({route: "auth"});
  
  return user; //response?.auth ? user : null;
};
