// src/auth.js
import axios from 'axios';

export const refreshToken = async () => {
  const refresh = localStorage.getItem('refreshToken');
  if (!refresh) return false;

  try {
    const res = await axios.post('http://localhost:8000/auth/jwt/refresh/', {
      refresh: refresh,
    });

    localStorage.setItem('accessToken', res.data.access);
    return true;
  } catch (err) {
    console.error('Token refresh failed', err);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return false;
  }
};
