import React from 'react'
import Navbar from './navbar';
import Banner from './banner';
import Footer from  '../admin/components/Footer'
import { Outlet } from 'react-router-dom';
// import {useReqHttp} from  '../customHooks/useReqHttp';

export default function Layouts() {
  // const {isLoading, isError, error, data} = useReqHttp('/setting/change-banner-content', null, null);
  // console.log('data '+ data, 'loading '+isLoading, 'error '+ error)
  return (
    <div>
        <Navbar/>
        <br/><br/>
        <Banner/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
