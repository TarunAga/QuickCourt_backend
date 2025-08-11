// API Configuration
const API_CONFIG = {
  BASE_URL: 'http://localhost',
  PORT: '3001',
  VERSION: 'v1.0'
};

// Construct the full API URL
export const API_BASE_URL = `${API_CONFIG.BASE_URL}:${API_CONFIG.PORT}/api/${API_CONFIG.VERSION}`;

export default API_CONFIG;
