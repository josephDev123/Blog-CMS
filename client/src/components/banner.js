import React, { useState, Fragment } from 'react'
import '../css/banner.css';
import { useReqHttp } from '../customHooks/useReqHttp';
import Loading from '../admin/components/Loading';
import { ErrorAlert } from '../admin/components/ErrorAlert';
import bannerPhoto from '../css/banner.module.css';

export default function Banner() {
  const [alert, setAlert] = useState(true);
  const url = 'setting/change-banner-content';
  const {isLoading, isError, error, data} = useReqHttp(url, null, null);
  // console.log( data)
 

  if(isLoading){
    return <Loading> Loading ... </Loading>
  }

  if (isError) {
    return <ErrorAlert alert={alert} setAlert={setAlert}>{error.message}</ErrorAlert>
  }

  if (data.message.length === 0) {
    return (
      <section className='container'>
      
      <div className={ bannerPhoto.banner_container}>
        <div className='banner_content_wrapper'>
            <h4>Velit dolore ut nostrud aliquip pariatur officia dolore.</h4>
            <p className='mt-2'>Sint labore anim qui in.</p>
        </div>
      </div>
      </section>
    )
  }

  return (
    <div className='container' style={{ backgroundImage:`url(${data.message[0].banner_image_link})`,backgroundRepeat:"no-repeat",backgroundSize:"cover" , backgroundPosition:'center'}} height='25em'>
      <div className='banner_content_wrapper'>
        {data.message.map(item=>(
          <Fragment key={item._id}>
              <h4>{item.title}</h4>
              <p className='mt-2'>{item.banner_content}</p>
          </Fragment>
        ))}
          
      </div>
    </div>
  )
}
