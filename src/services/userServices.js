import api from "./apiService";
import { getStoredItem, setStoredItem } from "./localStorageAPI";

export const getUsers = async () => {
  return await api.read({route: "users"});
};

export const saveUser = async (userData) => {
  await api.post("users", userData)
  return userData;
};

export const deleteUser = async (userId) => {
  await api.delete("users", userId);
  return await getUsers();
 };
 
 export const getUserToken = () => {
  return getStoredItem("user") || null;
 }
 
 export const setUserToken = (token) => {
  return setStoredItem("user",token);
 }

export const userLogin = async (loginData) => {
  const response = await api.get({route: "users/login", params: [loginData.email,loginData.password]});
  if (response?.auth){
    setUserToken({...response.user, token: response.token});
    return response.user;
  }
  return {error: 'falha no login!'}
};

export const userLogout = async () => {
  const response = await api.get({ route: "logout" });
  if (response?.auth === false){
    setUserToken(null);
    return null;
  }
  return {error: 'falha no logout!'}
};

export const userAuth = async () => {
  const user = await getUserToken();
  if(!user){
    return null;
  }
  //const response = await api.get({route: "auth"});
  
  return user; //response?.auth ? user : null;
};