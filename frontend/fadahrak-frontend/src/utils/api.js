// src/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // الـ proxy في vite.config.js هيحوله لـ localhost:5000
});

// Interceptor تلقائي يضيف الـ token في كل طلب
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor للـ errors (اختياري بس مفيد)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      alert('انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى');
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
