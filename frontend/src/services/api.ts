import axios, { AxiosError } from 'axios';
import { useAuthStore } from '../stores/useAuthStore';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest?.headers['X-Retry-After-Refresh']) {
      try {
        // Try to refresh the token
        const response = await axios.post(
          'http://localhost:8080/api/auth/refresh',
          {},
          { withCredentials: true }
        );
        
        // If refresh successful, retry the original request
        if (response.status === 200) {
          originalRequest!.headers['X-Retry-After-Refresh'] = 'true';
          return api(originalRequest!);
        }
      } catch (refreshError) {
        // If refresh token is invalid, logout the user
        useAuthStore.getState().setUser(null);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // If it's not a 401 error or refresh failed
    if (error.response?.data) {
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject(new Error('No response from server'));
    } else {
      return Promise.reject(error);
    }
  }
);

export default api; 