import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3001/api'
  : 'https://ipimtr-backend.onrender.com/api'; // Render.com URL'iniz

export const getIpInfo = async (ip?: string) => {
  const endpoint = ip ? `/ip/${ip}` : '/ip';
  return axios.get(`${API_URL}${endpoint}`);
};
