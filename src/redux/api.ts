import axios from 'axios';

const API_BASEURL = 'https://brilloapis.onrender.com/api/v1'


const api = axios.create({
  baseURL: API_BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      window.location.href = '/';
      // Network error or other unexpected error
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export default api;