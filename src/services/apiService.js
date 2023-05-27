import { getUserToken, userLogout } from "./userServices";

const checkAuth = async (response) => {
  if (response?.message === "Autentication failed") {
    window.location.href = window.location.origin;
    await userLogout();
    return null;  
} 
  return response;
};

const api = {
  read: async ({ route }) => {
    const response = await api.get({ route });
    return response ? response.map((ele) => ({ ...ele, id: ele["_id"] })) : [];
  },
  get: async ({ route, params, header }) => {
    const user = (await getUserToken()) || "";
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
    const user = (await getUserToken()) || "";
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
  put: async ({route, body, params}) => {
    const user = (await getUserToken()) || "";
    let requestOptions = {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(body),
      keepalive: false,
    };

    const response = await fetch(
      process.env.REACT_APP_API + route +
      (params ? "/" + params.join("/") : ""),
      requestOptions
    ).then((response) => response.json());

    return checkAuth(response);
  },
  delete: async (route, id) => {
    const user = (await getUserToken()) || "";
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
