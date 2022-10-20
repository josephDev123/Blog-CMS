// import {react, useState} from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

async function Categories(url){

    try{
        const req = await axios({
            url:`${url}`,
            method:'get',
            params:{
                id:5
            }
        });
        const res = await req.data;
        return res;
    }catch(error){
       return error.message;
    }
   
}


export const useSelectCategory = (url)=>{
    const {isLoading, isError, error, data} = useQuery(['category', url], ()=>Categories(url));
    return {isLoading, isError, error, data};
}