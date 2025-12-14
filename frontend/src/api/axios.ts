import axios from 'axios';

const fallbackURL = "http://localhost:5500/api";
const baseURL = import.meta.env.VITE_API_URL || fallbackURL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
})

export default api;