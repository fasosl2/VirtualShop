import api from "./apiService";

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
  return localStorage.getItem("x-access-token") || '';
 }
 
 export const setUserToken = (token) => {
  return localStorage.setItem("x-access-token",token);
 }

export const userLogin = async (loginData) => {
  const response = await api.get({route: "users/login", params: [loginData.email,loginData.password]});
  if (response?.auth){
    setUserToken(response.token);
    return response.user;
  }
  return {error: 'falha no login!'}
};

export const userAuth = async () => {
  const token = getUserToken();
  return await api.get({route: "auth", header:{ 'x-access-token': token}});
};