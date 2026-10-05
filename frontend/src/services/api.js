import axios from 'axios';

/**
 * MaanWin51 - Centralized Axios Instance
 * 
 * Configured with credentials for secure PHP session cookie management.
 * In development, requests to /api are proxied to the PHP server.
 * In production, requests to /api are served natively from the same domain.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 15000,
});

// Response interceptor for consistent error extraction
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // If backend provided a standardized JSON error response
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }

    // Network error or server unreachable
    return Promise.reject({
      success: false,
      message: error.message || 'Network connection issue. Please check your connection and try again.',
      errors: {},
    });
  }
);

export default api;
