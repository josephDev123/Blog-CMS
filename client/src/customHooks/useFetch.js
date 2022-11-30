import react from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';


//server request
async function serverRequest(url, query){
  try {
    const req =  await axios({
      url:`${url}`,
      method:'get',
      params:{
          query:`${query}`
      }
    })
    const res = await req.data;
    return res;
  } catch (error) {
    return error.message;
  }
  
}

export function useFetch(url, param){
       const {isLoading, isError, data, error, isFetching} = useQuery(['server', url, param], async ()=>serverRequest(url, param))
       return {isLoading, isError, data, error};
}