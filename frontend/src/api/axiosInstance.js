import axios from 'axios';
import config from './config';

let authStore = null;

export const injectAuthStore = (store) => {
  authStore = store;
};

const axiosInstance = axios.create({
  baseURL: config.BASE_URL,
});

// Attach access token
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

// Intercept 401 to refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem('refresh');
        if (!refresh) throw new Error('No refresh token');

        const response = await axios.post(`${config.BASE_URL}/auth/refresh`, {
          refresh,
        });

        const newAccess = response.data.access;
        localStorage.setItem('access', newAccess);

        if (authStore?.loginContext) {
          authStore.loginContext(newAccess); // updates context
        }

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        if (authStore?.logoutContext) authStore.logoutContext();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
