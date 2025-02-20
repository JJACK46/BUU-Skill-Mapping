import axios from 'axios';
import { Notify } from 'quasar';
import { useRoute } from 'vue-router';

const api = axios.create({
  baseURL: process.env.VITE_BACKEND_API,
  withCredentials: true,
  timeout: 5000,
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  function (response) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.reload();
    }
    return response;
  },
  function (e) {
    const route = useRoute();
    if (route) {
      if (route.path === '/login' || route.path === '/landing') return;
    }
    Notify.create({
      type: 'negative',
      message: e + ' | ' + e.response?.data.message,
      timeout: 5000,
      progress: true,
    });
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(e);
  },
);
export { api, axios };
