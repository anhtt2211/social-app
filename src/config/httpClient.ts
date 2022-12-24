import { AxiosRequestConfig } from "./../../node_modules/axios/index.d";
import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:8000/api/",
});

httpClient.interceptors.request.use((config) => {
  let reqConfig = { ...config };
  const token = localStorage.getItem("token");

  if (token) {
    reqConfig = {
      ...config,
      headers: { ...config.headers, Authorization: `Token ${token}` },
    };
  }

  return reqConfig;
});

httpClient.interceptors.response.use((response) => response.data);

export default httpClient;
