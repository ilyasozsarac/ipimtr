import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3001/api'
  : 'https://your-production-backend-url.com/api';

export const getIpInfo = async (ip?: string) => {
  const endpoint = ip ? `/ip/${ip}` : '/ip';
  return axios.get(`${API_URL}${endpoint}`);
};
