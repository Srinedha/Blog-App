import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/jwt/refresh/')
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await axios.post('http://localhost:8000/auth/jwt/refresh/', {
          refresh: refreshToken
        });
        localStorage.setItem('accessToken', res.data.access);
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = "/login"; // Force logout if refresh fails
      }
    }

    return Promise.reject(error);
  }
);

export default API;
