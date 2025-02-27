import axios from 'axios';
import { Notify, SessionStorage } from 'quasar';
import { useAuthStore } from 'src/stores/auth';

const api = axios.create({
  baseURL: process.env.VITE_BACKEND_API || 'http://localhost:3000',
  withCredentials: true,
  timeout: 5000,
});

api.interceptors.request.use(
  function (config) {
    const auth = useAuthStore();
    const token = auth.getAccessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error as Error);
  },
);

api.interceptors.response.use(
  function (response) {
    if (response.status === 401) {
      SessionStorage.removeItem('userPayload');
      window.location.reload();
    }
    return response;
  },
  function (e) {
    if (e.response?.status === 401) {
      SessionStorage.remove('userPayload');
      return;
    }
    Notify.create({
      type: 'negative',
      message: e + ' | ' + e.response?.data.message,
      timeout: 5000,
      progress: true,
    });
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(e as Error);
  },
);
export { api, axios };
