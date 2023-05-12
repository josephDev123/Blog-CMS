import axios from 'axios';

 const axiosInstance = axios.create({
    baseURL: 'https://blog-cms.up.railway.app/'
})


export default axiosInstance;