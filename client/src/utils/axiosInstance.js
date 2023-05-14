import axios from 'axios';

 const axiosInstance = axios.create({
    baseURL: 'https://blog-cms-server.onrender.com/'
})

// http://localhost:7000
export default axiosInstance;