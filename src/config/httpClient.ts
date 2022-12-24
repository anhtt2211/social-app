import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://api.realworld.io/api/',
  // baseURL: 'http://localhost:8000/api/',
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
