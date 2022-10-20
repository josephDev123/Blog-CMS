import React from 'react'
import Navbar from './navbar';
import Banner from './banner';
import Footer from  '../admin/components/Footer'
import { Outlet } from 'react-router-dom';

export default function Layouts() {
  return (
    <div>
        <Navbar/>
        <Banner/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
