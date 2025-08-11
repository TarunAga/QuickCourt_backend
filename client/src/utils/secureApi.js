/**
 * Secure API wrapper that prevents sensitive data exposure
 * This layer ensures no sensitive information is logged or visible in dev tools
 */

import { API_BASE_URL } from './config.js';

// Define sensitive fields that should never be logged
const SENSITIVE_FIELDS = ['password', 'token', 'otp', 'secret', 'key'];

// Sanitize object by removing sensitive fields for logging
const sanitizeForLogging = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeForLogging(item));
  }
  
  const sanitized = { ...obj };
  SENSITIVE_FIELDS.forEach(field => {
    if (sanitized[field]) {
      sanitized[field] = '[HIDDEN]';
    }
  });
  
  Object.keys(sanitized).forEach(key => {
    if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeForLogging(sanitized[key]);
    }
  });
  
  return sanitized;
};

// Secure fetch wrapper
const secureFetch = async (url, options = {}) => {
  // Never log the actual request with sensitive data
  const isDevMode = process.env.NODE_ENV === 'development';
  
  if (isDevMode) {
    console.log(`🔐 API Request to: ${url.replace(API_BASE_URL, '')}`);
    if (options.body) {
      const parsedBody = JSON.parse(options.body);
      console.log('📝 Request data (sanitized):', sanitizeForLogging(parsedBody));
    }
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...options.headers
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Request failed');
    }

    const data = await response.json();
    
    if (isDevMode) {
      console.log('✅ Response received (sanitized):', sanitizeForLogging(data));
    }
    
    return data;
  } catch (error) {
    if (isDevMode) {
      console.error('❌ Request failed:', error.message);
    }
    throw error;
  }
};

// Helper function to get authorization headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }
  return await response.json();
};

// User APIs with security
export const userAPI = {
  register: async (userData) => {
    return secureFetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  login: async (credentials) => {
    return secureFetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  getProfile: async () => {
    return secureFetch(`${API_BASE_URL}/users/me`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
  },

  updateProfile: async (userData) => {
    return secureFetch(`${API_BASE_URL}/users/me`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    });
  },

  verifyOtp: async (otpData) => {
    return secureFetch(`${API_BASE_URL}/users/verify-otp`, {
      method: 'POST',
      body: JSON.stringify(otpData)
    });
  },

  resendOtp: async (email) => {
    return secureFetch(`${API_BASE_URL}/users/resend-otp`, {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  }
};

// Facility APIs
export const facilityAPI = {
  getAll: async () => {
    return secureFetch(`${API_BASE_URL}/facilities`, {
      method: 'GET'
    });
  },

  getById: async (facilityId) => {
    return secureFetch(`${API_BASE_URL}/facilities/${facilityId}`, {
      method: 'GET'
    });
  }
};

// Booking APIs
export const bookingAPI = {
  getMyBookings: async () => {
    return secureFetch(`${API_BASE_URL}/bookings`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
  },

  create: async (facilityId, bookingData) => {
    return secureFetch(`${API_BASE_URL}/facilities/${facilityId}/bookings`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookingData)
    });
  },

  cancel: async (bookingId) => {
    return secureFetch(`${API_BASE_URL}/bookings/${bookingId}/cancel`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });
  }
};

// Review APIs
export const reviewAPI = {
  getFacilityReviews: async (facilityId) => {
    return secureFetch(`${API_BASE_URL}/facilities/${facilityId}/reviews`, {
      method: 'GET'
    });
  },

  create: async (facilityId, reviewData) => {
    return secureFetch(`${API_BASE_URL}/facilities/${facilityId}/reviews`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(reviewData)
    });
  }
};

// Export all APIs
export const API = {
  user: userAPI,
  facility: facilityAPI,
  booking: bookingAPI,
  review: reviewAPI
};
