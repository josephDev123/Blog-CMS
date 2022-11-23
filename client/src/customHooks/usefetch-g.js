import axios from "axios";
import { useQuery } from "react-query";
import axiosInstance from '../utils/axiosInstance';

async function fetch(url,  body, param){
    const bodies = body && body;
    const params = param && param
    try {
        const req_make =  await axiosInstance({
            url: url,   
            method: 'get',
            data:bodies,
            params:params
           })
        const req_result = await req_make.data;
        if (req_result.statusText === 'OK') {
            return req_result;
        }
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            throw new Error(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            throw new Error(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error(error.message);
          }
    }
  
}

export const useFetchGeneral = (url, body, param)=>{
    const {isLoading, isError, error, data} = useQuery(['general_fetch', url], (url)=>fetch(url, body, param));
    return {isLoading, isError, error, data};
}