import { getUserToken, userLogout } from "./userServices";

interface UserToken {
  token: string;
}

interface ApiResponse {
  [key: string]: any;
}

interface ApiGetParams {
  route: string;
  params?: string[] | Record<string, any>;
  header?: Record<string, string>;
}

interface ApiPutParams {
  route: string;
  body: any;
  params?: string[];
}

const checkAuth = async (response: ApiResponse | null): Promise<ApiResponse | null> => {
  if (response?.message === "Autentication failed") {
    window.location.href = window.location.origin;
    await userLogout();
    return null;
  }
  return response;
};

const api = {
  read: async ({ route }: { route: string }): Promise<{ list: any[] } | any[]> => {
    const response = await api.get({ route });

    // Normaliza para garantir que sempre haja "list"
    const list = (Array.isArray(response) ? response : response.list || []).map(
      (item: any) => ({ ...item, id: item._id })
    );

    // Se o backend retorna metadados, preserva eles
    return Array.isArray(response) ? list : { ...response, list };
  },
  get: async ({ route, params, header }: ApiGetParams): Promise<ApiResponse | null> => {
    const user: UserToken | null = (await getUserToken()) || null;
    let requestOptions: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user?.token || "",
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
  post: async (route: string, body: any): Promise<ApiResponse | null> => {
    const user: UserToken | null = (await getUserToken()) || null;
    let requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user?.token || "",
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
  put: async ({ route, body, params }: ApiPutParams): Promise<ApiResponse | null> => {
    const user: UserToken | null = (await getUserToken()) || null;
    let requestOptions: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user?.token || "",
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
  delete: async (route: string, id: string | number): Promise<ApiResponse | null> => {
    const user: UserToken | null = (await getUserToken()) || null;
    let requestOptions: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user?.token || "",
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
