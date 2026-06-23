import axios from 'axios';
import { storageManager } from '../utils/storage';

const BASE_URL = import.meta.env.VITE_API_URL;
const TIMEOUT = 10000;

export const publicClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

authClient.interceptors.request.use(
  (config) => {
    const token = storageManager.getSessionKey();
    if (token) {
      config.headers['X-Session-Key'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Sesi Member kedaluwarsa (401). Membersihkan storage...");
      
      storageManager.clearSessionKey();
      storageManager.clearEmail();
      
      const currentPath = window.location.pathname;
      
      if (currentPath && currentPath !== '/') {
        console.warn("Mengalihkan member ke halaman utama...");
        window.location.href = '/';
      } else {
        console.warn("Member sudah di root, me-refresh halaman...");
        window.location.reload();
      }
    }
    
    return Promise.reject(error);
  }
);

export default authClient;