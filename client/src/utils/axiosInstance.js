import axios from 'axios';

 const axiosInstance = axios.create({
    baseURL: 'http://localhost:7000/'
})


export default axiosInstance;