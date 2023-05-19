import { getUserToken } from "./userServices";

const api = {
  read: async ({route}) => {
    const response = await api.get({route});
    return response.map((ele) => ({ ...ele, id: ele["_id"] }));
  },
  get: async ({route, params, header}) => {
    const token = getUserToken();
    let requestOptions = {
      method: "GET",
      headers: { 
        'Content-Type': 'application/json',
      'x-access-token': token,
      ...header },
    };

    const response = fetch(process.env.REACT_APP_API + route + (params ? '/' + params.join('/') : ''), requestOptions)
      .then((response) => response.json());

    return await response;
  },
  post: async (route, body) => {
    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: false
    };

    const response = fetch(
      process.env.REACT_APP_API + route,
      requestOptions
    ).then((response) => response.json());

    return await response;
  },
  delete: async (route,id) => {
    let requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    const response = fetch(process.env.REACT_APP_API + route + '/' +  id, requestOptions)
    .then((response) => response.json());

    return await response;
  }
};

export default api;
