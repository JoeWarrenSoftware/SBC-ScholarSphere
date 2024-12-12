import axios from 'axios';

import mockAxios from './mock/mockApi';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  console.log('token', token);
  if (token) {
    config.headers.Authorization = `token ${token}`;
  }
  return config;
});

export default mockAxios
//export default api;
