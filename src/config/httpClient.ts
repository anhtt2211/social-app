import axios from 'axios';
import { REACTJS_BOILERPLATE_API } from './development';

export const httpClient = axios.create({
  baseURL: REACTJS_BOILERPLATE_API,
});

httpClient.interceptors.request.use((config) => {
  let reqConfig = { ...config };
  const token = localStorage.getItem('token');

  if (token) {
    reqConfig = {
      ...config,
      headers: { ...config.headers, Authorization: `Token ${token}` },
    };
  }

  return reqConfig;
});

httpClient.interceptors.response.use((response) => response.data);
