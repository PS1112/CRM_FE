import axios from "axios";
let customAxios = axios.create({
  baseURL: "http://localhost:5000/",

  // baseURL: "http://54.236.177.45/"
});
customAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      window.localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export async function getApi(path, data) {
  return await customAxios.get(`/${path}`);
}
export async function postApi(path, data) {
  return await customAxios.post(`/${path}`, data);
}
export async function putApi(path, data) {
  return await customAxios.put(`/${path}`, data);
}
export async function deleteApi(path, data) {
  return await customAxios.delete(`/${path}`, {
    data: data,
  });
}