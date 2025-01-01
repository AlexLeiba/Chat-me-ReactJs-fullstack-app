import axios from 'axios';
// import { cookies } from 'next/headers'; // For server-side cookie handling

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5001/api',

  baseURL: '/api',

  withCredentials: true, // Ensures cookies are included in requests
});

export default axiosInstance;
