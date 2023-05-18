const api = {
  get: async (route) => {
    let requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const response = fetch(process.env.REACT_APP_API + route, requestOptions)
      .then((response) => response.json())
      .then((itemsList) =>
        itemsList.map((ele) => ({ ...ele, id: ele["_id"] }))
      );

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
