// import axios from "axios";
import { useQuery } from "react-query";
import axiosInstance from '../utils/axiosInstance';

async function Req_get(url, body='', param='', headersParams=null){
    const bodies = body && body;
    const params = param?param: ''
    const headersCredential = !headersParams?headersParams:null
    try {
        const req_make =  await axiosInstance({
            url:`${url}`, 
            method: 'get',
            data:bodies,
            params:{
                query:params
            },
            headers:{
                'currentUser': headersCredential
            }
           })
        const req_result = await req_make;
        if (req_result.statusText === 'OK') {
            return req_result.data;
        }
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return new Error(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            return new Error(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            return new Error(error.message);
          }
    }
  
}

export const useReqHttp = (url, body, param, headers)=>{
    const { isLoading, isError, error, data } = useQuery(['httpReq', url, body, param], async()=> Req_get(url, body, param, headers));
    return { isLoading, isError, error, data };
}