import axios from 'axios';

const api = axios.create({
  baseURL: "https://portfolio-v1-2-6ik8.onrender.com/api",
  headers: {
    'Content-Type': 'application/json'
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