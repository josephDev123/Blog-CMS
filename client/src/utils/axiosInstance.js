import axios from 'axios';

 const axiosInstance = axios.create({
    baseURL: 'https://blog-cms-server.onrender.com:7000'
})

// http://localhost:7000
export default axiosInstance;