import axios from 'axios';
import { storageManager } from '../utils/storage';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = storageManager.getSessionKey();
    if (token) {
      config.headers['X-Session-Key'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Sesi kedaluwarsa (401). Membersihkan storage dan me-refresh halaman...");
      
      storageManager.clearSessionKey();
      storageManager.clearEmail();
      
      window.location.reload();
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;