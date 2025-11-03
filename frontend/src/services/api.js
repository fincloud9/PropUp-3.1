import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
const API_VERSION = process.env.REACT_APP_API_VERSION || 'v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: `${API_BASE_URL}/${API_VERSION}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, try to refresh
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/${API_VERSION}/auth/refresh`, {
            refresh_token: refreshToken,
          });
          localStorage.setItem('access_token', response.data.access_token);
          // Retry original request
          return api.request(error.config);
        } catch (refreshError) {
          // Refresh failed, logout user
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// API Service Functions

// Authentication
export const authService = {
  connectWallet: (data) => api.post('/auth/wallet/connect', data),
  disconnectWallet: () => api.post('/auth/wallet/disconnect'),
  getNonce: (walletAddress) => api.get('/auth/nonce', { params: { wallet_address: walletAddress } }),
  refreshToken: (refreshToken) => api.post('/auth/refresh', { refresh_token: refreshToken }),
};

// User Management
export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getUser: (userId) => api.get(`/users/${userId}`),
  getPortfolio: (userId) => api.get(`/users/${userId}/portfolio`),
};

// KYC
export const kycService = {
  initiateKYC: (data) => api.post('/kyc/initiate', data),
  getKYCStatus: () => api.get('/kyc/status'),
};

// Properties
export const propertyService = {
  getProperties: (params) => api.get('/properties', { params }),
  getProperty: (id) => api.get(`/properties/${id}`),
  createProperty: (data) => api.post('/properties', data),
  updateProperty: (id, data) => api.put(`/properties/${id}`, data),
  deleteProperty: (id) => api.delete(`/properties/${id}`),
  searchProperties: (data) => api.post('/properties/search', data),
};

// Tokenization
export const tokenizationService = {
  tokenizeProperty: (data) => api.post('/tokenization/create', data),
  getMetadata: (propertyId) => api.get(`/tokenization/${propertyId}/metadata`),
};

// Marketplace
export const marketplaceService = {
  getListings: (params) => api.get('/marketplace/listings', { params }),
  createListing: (data) => api.post('/marketplace/listings', data),
  buyProperty: (data) => api.post('/marketplace/buy', data),
  getTransactions: () => api.get('/marketplace/transactions'),
};

// AI Services
export const aiService = {
  chat: (data) => api.post('/ai/chat', data),
  getRecommendations: (data) => api.post('/ai/recommendations', data),
  getValuation: (data) => api.post('/ai/valuation', data),
};

// Analytics
export const analyticsService = {
  getPlatformMetrics: () => api.get('/analytics/platform'),
  getUserAnalytics: () => api.get('/analytics/user'),
};
