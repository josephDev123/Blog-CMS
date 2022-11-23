import React from 'react'
import '../css/banner.css';
import {useFetchGeneral} from '../customHooks/usefetch-g';

export default function Banner() {
 const {isLoading, isError, error, data} = useFetchGeneral('/setting/change-banner-content')
 console.log(data, error)

  return (
    <div className='container banner_container'>
      <div className='banner_content_wrapper'>
          <h4>Velit dolore ut nostrud aliquip pariatur officia dolore.</h4>
          <p className='mt-2'>Sint labore anim qui in.</p>
      </div>
      
       
    </div>
  )
}
