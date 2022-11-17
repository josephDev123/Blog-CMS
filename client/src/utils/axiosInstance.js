import axios from 'axios';

export const axiosInstance = axios.create({
    baseUrl: 'http://localhost:7000/'
})