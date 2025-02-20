import axios from 'axios';
import { Notify } from 'quasar';
import { useAuthStore } from 'src/stores/auth';
import { useRoute, useRouter } from 'vue-router';

const api = axios.create({
  baseURL: process.env.VITE_BACKEND_API,
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
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  function (response) {
    if (response.status === 401) {
      sessionStorage.removeItem('userPayload');
      window.location.reload();
    }
    return response;
  },
  function (e) {
    const route = useRoute();
    const router = useRouter();
    if (e.response?.status === 401) {
      sessionStorage.remove('userPayload');
      router.push('/login'); // Redirect instead of reload
      return;
    }
    if (route && (route.path === '/login' || route.path === '/landing')) return;
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
