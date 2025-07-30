// 🔄 SINGLE TOGGLE: Change VITE_ENVIRONMENT to switch between development/production
const environment = import.meta.env.VITE_ENVIRONMENT || 'development'; // 'development' or 'production'
const isProduction = environment === 'production';

const config = {
  // Automatically configure API URL based on environment
  BASE_URL: isProduction 
    ? (import.meta.env.VITE_API_BASE_URL || 'https://your-render-app.onrender.com/api')
    : 'http://localhost:8000/api',
  
  // Environment info for debugging
  ENVIRONMENT: environment,
  IS_PRODUCTION: isProduction
};

export default config;
