import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.BACKEND_API,
  withCredentials: true,
  timeout: 5000,
});

instance.interceptors.request.use(
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
  }
);

instance.interceptors.response.use(
  function (response) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.reload();
    }
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
