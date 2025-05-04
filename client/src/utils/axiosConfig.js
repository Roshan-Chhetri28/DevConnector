import axios from 'axios';

const base = process.env.REACT_APP_API_URL || '';

const api = axios.create({
  baseURL: `${base}/api`,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export default api;
