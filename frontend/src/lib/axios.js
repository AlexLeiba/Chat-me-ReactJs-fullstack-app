import axios from 'axios';
// import { cookies } from 'next/headers'; // For server-side cookie handling

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === 'development'
      ? 'http://localhost:5001/api'
      : '/api',
  withCredentials: true, // Ensures cookies are included in requests
});

export default axiosInstance;
