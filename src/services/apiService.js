import { getUserToken } from "./userServices";

const checkAuth = (response) => {
  if (response?.message === "Autentication failed") {
    window.location.href = window.location.origin;
    return null;  
} 
  return response;
};
const user = (await getUserToken()) || "";

const api = {
  read: async ({ route }) => {
    const response = await api.get({ route });
    return response ? response.map((ele) => ({ ...ele, id: ele["_id"] })) : [];
  },
  get: async ({ route, params, header }) => {
    let requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token,
        ...header,
      },
    };

    const response = await fetch(
      process.env.REACT_APP_API +
        route +
        (params ? "/" + params.join("/") : ""),
      requestOptions
    ).then((response) => response.json());

    return checkAuth(response);
  },
  post: async (route, body) => {
    let requestOptions = {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(body),
      keepalive: false,
    };

    const response = await fetch(
      process.env.REACT_APP_API + route,
      requestOptions
    ).then((response) => response.json());

    return checkAuth(response);
  },
  delete: async (route, id) => {
    let requestOptions = {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        "x-access-token": user.token
       },
    };

    const response = await fetch(
      process.env.REACT_APP_API + route + "/" + id,
      requestOptions
    ).then((response) => response.json());

    return await checkAuth(response);
  },
};

export default api;
