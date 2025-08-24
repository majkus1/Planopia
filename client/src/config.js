export const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production'
    ? 'https://api.planopia.pl'
    : 'http://localhost:3000');
