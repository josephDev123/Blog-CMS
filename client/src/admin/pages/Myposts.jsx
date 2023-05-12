import React from 'react';
import headingTag from '../asset/css/css_modules/page-heading.module.css';
import MyPostsTable from '../components/myPostsTable';
import {useReqHttp} from '../../customHooks/useReqHttp';
import { useContext, useLayoutEffect } from 'react';
import {AuthContext} from  '../../Context/AuthContext';
import {useState} from 'react';
import Loading from '../components/Loading';
import {ErrorAlert} from '../components/ErrorAlert';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MypostBanner from '../components/MypostBanner'

export default function Myposts() {
    const {isAuthUser} = useContext(AuthContext);
    // console.log(isAuthUser)
    // const { id } = useParams();
    const [page, setPage]= useState(0);
    const [key, setKey]= useState(uuidv4());
    const [errorAlert, setErrorAlert]= useState(true);


    //refetch the usequery if the dependency changes
    const queryKey = useMemo(()=>{
        return key;
    }, [key])


    useLayoutEffect(()=>{
        document.title = 'My Personal Post Page';
    }, [])

    const increasePage = ()=>{
         return setPage((old)=>old + 1)
    }

     const decreasePage = ()=>{
        return setPage((old)=>old - 1)
    }
   

    const {isLoading, isError, error, data,  isFetching, isPreviousData} = useReqHttp('blog/post/currentUser', null, page, queryKey, isAuthUser, true);
    // console.log(data?.data)
   
  return (
    <div className='container mt-4'>
        <span className={headingTag.headingTag}>/My posts</span>
            <MypostBanner/>

            {isLoading?
            <> <Loading/></>
            :isError?
            <ErrorAlert alert={errorAlert} setAlert={setErrorAlert}>Oh! something went wrong</ErrorAlert>:
            <section className='table_wrapper mt-5'>
                <MyPostsTable currentUserPosts={data.data} increasePage = {increasePage} isFetching={isFetching} isPreviousData={isPreviousData} currentPage = {page} decreasePage = {decreasePage} setquerykey={setKey}/> 
            </section>
            }
        
    </div>
  )
}
