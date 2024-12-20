import axios from 'axios';
import { Notify } from 'quasar';
import { useGlobalStore } from 'src/stores/global';


const api = axios.create({
  baseURL: process.env.BACKEND_API,
  withCredentials: true,
  timeout: 5000,
});

api.interceptors.request.use(
  function (config) {
    const loader = useGlobalStore();
    loader.setLoading(true);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    const loader = useGlobalStore();
    loader.setLoading(false);
    // Do something with request error
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    const loader = useGlobalStore();
    loader.setLoading(false);

    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.reload();
    }
    return response;
  },
  function (e) {
    const loader = useGlobalStore();

    loader.setLoading(false);
    Notify.create({
      type: 'negative',
      message: e + ' | ' + e.response.data.message,
      timeout: 5000,
      progress: true,
    });
    console.error(e);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(e);
  }
);
export { api, axios };
