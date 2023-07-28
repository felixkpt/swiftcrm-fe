import { useAuth } from '@/contexts/AuthContext';

// // request.js
// import axios from 'axios';

// // Create a new instance of Axios with the desired default configuration
// const axiosInstance = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api', // Replace with your Laravel API base URL
//   timeout: 10000, // Adjust the timeout (in milliseconds) as needed
// });

// axios.defaults.withCredentials = true;

// // Set Bearer token in the Authorization header
// const bearerToken = 'YOUR_BEARER_TOKEN_HERE'; // Replace with your Bearer token
// axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${bearerToken}`;

// export default axiosInstance;

import Axios from 'axios';

const axios = Axios.create({
	baseURL: "http://localhost:8000/api",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
	},
});



export default axios;