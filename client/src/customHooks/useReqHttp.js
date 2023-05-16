// import axios from "axios";
import { useQuery } from "react-query";
import axiosInstance from '../utils/axiosInstance';

async function Req_get(url, body='', param='', headersParams=null){
    const bodies = body? body: '';
    const params = param?param: ''
    const headersCredential = headersParams?headersParams:null
    // try {
        const req_make =  await axiosInstance({
            url:`${url}`, 
            method: 'get',
            data:bodies,
            params:{
                'query':params
            },
            headers:{
                'currentUser': headersCredential
            }
           })
        const req_result =req_make;
        if (!req_result.statusText === 'OK') {
            throw new Error('oh oh error')
            // return req_result.data;
        }
        return req_result.data;
    // } catch (error) {
    //     if (error.response) {
    //         // The request was made and the server responded with a status code
    //         // that falls out of the range of 2xx
    //         throw new Error(error.response.data);
    //         // console.log(error.response.status);
    //         // console.log(error.response.headers);
    //       } else if (error.request) {
    //         // The request was made but no response was received
    //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //         // http.ClientRequest in node.js
    //         throw new Error(error.request);
    //       } else {
    //         // Something happened in setting up the request that triggered an Error
    //         throw new Error(error.message);
    //       }
    // }
  
}

export const useReqHttp = (url, body, param, useQueryKey, headers, isPagination)=>{
    const { isLoading, isError, error, data,  isFetching, isPreviousData } = useQuery(['httpReq', useQueryKey, url, body, param], 
    async ()=> Req_get(url, body, param, headers), 
    { keepPreviousData : isPagination });
    // const queryKey= 'httpReq';
    return { isLoading, isError, error, data, isFetching, isPreviousData};
}
