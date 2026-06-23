import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3002/api' });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export const incomeApi = {
  getAll: (params) => api.get('/income', { params }),
  getById: (id) => api.get(`/income/${id}`),
  create: (data) => api.post('/income', data),
  update: (id, data) => api.put(`/income/${id}`, data),
};
export const reportApi = {
  summary: () => api.get('/reports/income-summary'),
  byCategory: () => api.get('/reports/by-category'),
  monthlyTrend: () => api.get('/reports/monthly-trend'),
};
export default api;
