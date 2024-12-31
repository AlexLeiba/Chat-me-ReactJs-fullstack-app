import axios from 'axios';
// import { cookies } from 'next/headers'; // For server-side cookie handling

const axiosInstance = axios.create({
  baseURL: 'https://chat-me-full-stack-app.onrender.com/api', // production
  // baseURL: 'http://localhost:5001/api', //local
  withCredentials: true, // Ensures cookies are included in requests
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor: Attach cookies to every request
// axiosInstance.interceptors.request.use(async (config) => {
//   const cookieStore = await cookies(); // Get cookies from the server
//   const myCookie = cookieStore.get('myCookie')?.value; // Retrieve a specific cookie
//   if (myCookie) {
//     config.headers.Cookie = `myCookie=${myCookie}`; // Attach the cookie to the request headers
//   }
//   return config;
// });

// Response Interceptor: Save cookies from the response
// axiosInstance.interceptors.response.use(
//   async (response) => {
//     const setCookieHeader = response.headers['set-cookie'];
//     if (setCookieHeader) {
//       const cookieStore = await cookies(); // Use the cookies API to save cookies
//       setCookieHeader.forEach((cookie) => {
//         const [cookieName, cookieValue] = cookie.split(';')[0].split('=');
//         cookieStore.set(cookieName, cookieValue, {
//           path: '/',
//           httpOnly: true,
//           secure: true,
//           maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
//         });
//       });
//     }
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
