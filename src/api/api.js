import axios from 'axios';

const API_URL = 'https://expensetrackerbe-rkgb.onrender.com/api';

const api = axios.create({
  baseURL: API_URL
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data)
};

// Transaction APIs
export const transactionAPI = {
  create: (data) => api.post('/transactions', data),
  getAll: (params) => api.get('/transactions', { params }),
  getById: (id) => api.get(`/transactions/${id}`),
  update: (id, data) => api.put(`/transactions/${id}`, data),
  delete: (id) => api.delete(`/transactions/${id}`),
  getMonthlySummary: (year, month) => api.get('/transactions/summary/monthly', { params: { year, month } }),
  getYearlySummary: (year) => api.get('/transactions/summary/yearly', { params: { year } }),
  getDashboardStats: () => api.get('/transactions/stats/dashboard')
};

// Category APIs
export const categoryAPI = {
  getDefault: () => api.get('/categories/default'),
  getAll: () => api.get('/categories'),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`)
};

export default api;
