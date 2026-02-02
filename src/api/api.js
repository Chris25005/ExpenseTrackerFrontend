import axios from 'axios';

/* =========================
   BACKEND DEPLOYED URL
========================= */
const API_URL = 'https://expensetrackerbe-rkgb.onrender.com/api';

/* =========================
   AXIOS INSTANCE
========================= */
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/* =========================
   ADD JWT TOKEN TO REQUESTS
========================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// 2. New Response Interceptor (Add this)
api.interceptors.response.use(
  (response) => response, // If the request is successful, just return the response
  (error) => {
    // Check if the error is a 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized! Redirecting to login...");

      // Clear local storage so the app doesn't think we're still logged in
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Force redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
/* =========================
   AUTH APIs
========================= */
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data)
};

/* =========================
   TRANSACTION APIs
========================= */
export const transactionAPI = {
  // POST: Send userId in the body
  create: (data) => api.post('/transactions', { ...data, userId: getUserId() }),

  // GET: Send userId as a query parameter
  getAll: (params) => api.get('/transactions', { 
    params: { ...params, userId: getUserId() } 
  }),

  // GET: Send userId as a query parameter
  getById: (id) => api.get(`/transactions/${id}`, { 
    params: { userId: getUserId() } 
  }),

  // PUT: Send userId in the body
  update: (id, data) => api.put(`/transactions/${id}`, { ...data, userId: getUserId() }),

  // DELETE: Send userId as a query parameter
  delete: (id) => api.delete(`/transactions/${id}`, { 
    params: { userId: getUserId() } 
  }),

  // GET: Merge year/month with userId in params
  getMonthlySummary: (year, month) =>
    api.get('/transactions/summary/monthly', { 
      params: { year, month, userId: getUserId() } 
    }),

  // GET: Merge year with userId in params
  getYearlySummary: (year) =>
    api.get('/transactions/summary/yearly', { 
      params: { year, userId: getUserId() } 
    }),

  // GET: Send userId in params
  getDashboardStats: () =>
    api.get('/transactions/stats/dashboard', { 
      params: { userId: getUserId() } 
    })
};

/* =========================
   CATEGORY APIs
========================= */
export const categoryAPI = {
  getDefault: () => api.get('/categories/default'),
  getAll: () => api.get('/categories'),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`)
};
const getUserId = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.id;
};
export default api;
