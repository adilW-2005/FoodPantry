import axios from 'axios';
import config from './config';

const axiosInstance = axios.create({
  baseURL: config.BASE_URL,
});

axiosInstance.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('access');
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
