import { API_BASE_URL } from './config.js';

// Helper function to get authorization headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // CSRF protection
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

// User APIs
export const userAPI = {
  // Register a new user
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  // Login user
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(credentials)
    });
    return handleResponse(response);
  },

  // Get current user profile
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  // Verify OTP
  verifyOtp: async (otpData) => {
    const response = await fetch(`${API_BASE_URL}/users/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(otpData)
    });
    return handleResponse(response);
  },

  // Resend OTP
  resendOtp: async (email) => {
    const response = await fetch(`${API_BASE_URL}/users/resend-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({ email })
    });
    return handleResponse(response);
  }
};

// Facility APIs
export const facilityAPI = {
  // Get all facilities
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/facilities`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return handleResponse(response);
  },

  // Get facility by ID
  getById: async (facilityId) => {
    const response = await fetch(`${API_BASE_URL}/facilities/${facilityId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return handleResponse(response);
  }
};

// Booking APIs
export const bookingAPI = {
  // Get all bookings for current user
  getMyBookings: async () => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Create a new booking
  create: async (facilityId, bookingData) => {
    const response = await fetch(`${API_BASE_URL}/facilities/${facilityId}/bookings`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookingData)
    });
    return handleResponse(response);
  },

  // Cancel a booking
  cancel: async (bookingId) => {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/cancel`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

// Review APIs
export const reviewAPI = {
  // Get reviews for a facility
  getFacilityReviews: async (facilityId) => {
    const response = await fetch(`${API_BASE_URL}/facilities/${facilityId}/reviews`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return handleResponse(response);
  },

  // Create a review
  create: async (facilityId, reviewData) => {
    const response = await fetch(`${API_BASE_URL}/facilities/${facilityId}/reviews`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(reviewData)
    });
    return handleResponse(response);
  }
};

// Export all APIs
export const API = {
  user: userAPI,
  facility: facilityAPI,
  booking: bookingAPI,
  review: reviewAPI
};
