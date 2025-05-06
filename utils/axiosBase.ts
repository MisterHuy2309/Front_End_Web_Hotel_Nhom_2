import axios from 'axios';

export const axiosBase = axios.create({
  baseURL: 'http://nhom2webkhachsan.runasp.net/api', // kiểm tra lại URL này
  headers: {
    'Content-Type': 'application/json',
  },
});