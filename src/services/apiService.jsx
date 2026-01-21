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

    // Normaliza para garantir que sempre haja "list"
    const list = (Array.isArray(response) ? response : response.list || []).map(
      (item) => ({ ...item, id: item._id })
    );

    // Se o backend retorna metadados, preserva eles
    return Array.isArray(response) ? list : { ...response, list };
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

    // build URL: support array params (legacy) and object params (query string)
    let url = import.meta.env.VITE_APP_API + route;
    if (params) {
      if (Array.isArray(params)) {
        url += "/" + params.join("/");
      } else if (typeof params === "object") {
        const qs = new URLSearchParams();
        Object.keys(params).forEach((k) => {
          const v = params[k];
          if (v !== undefined && v !== null) qs.append(k, v);
        });
        const qstr = qs.toString();
        if (qstr) url += "?" + qstr;
      }
    }

    const response = await fetch(url, requestOptions).then((response) =>
      response.json()
    );

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
      import.meta.env.VITE_APP_API + route,
      requestOptions
    ).then((response) => response.json());

    return checkAuth(response);
  },
  put: async ({ route, body, params }) => {
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
      import.meta.env.VITE_APP_API +
        route +
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
        "x-access-token": user.token,
      },
    };

    const response = await fetch(
      import.meta.env.VITE_APP_API + route + "/" + id,
      requestOptions
    ).then((response) => response.json());

    return await checkAuth(response);
  },
};

export default api;
