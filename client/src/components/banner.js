import React, { useState, Fragment } from 'react'
import '../css/banner.css';
import { useReqHttp } from '../customHooks/useReqHttp';
import Loading from '../admin/components/Loading';
import { ErrorAlert } from '../admin/components/ErrorAlert';
import bannerPhoto from '../css/banner.module.css';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate  } from 'react-router-dom';

export default function Banner() {
  const [alert, setAlert] = useState(true);
  const url = 'setting/change-banner-content';

// const location= useLocation()
  const navigate = useNavigate()

  const {isAuthUser} = useContext(AuthContext);
  const {isLoading, isError, error, data} = useReqHttp(url, null, isAuthUser);
  console.log(data)
  // console.log( data)

  const styleBgImg = {
     maxHeight:'30rem', 
     maxWidth:'100%', 
     objectFit:'cover',   
    //  objectPosition: '80% 80%'
  }
 

  if(isLoading){
    return <Loading> Loading ... </Loading>
  }

  if (isError) {
    return <ErrorAlert alert={alert} setAlert={setAlert}>{error.message}</ErrorAlert>
  }

  if (data.message.length <= 0) {
    return (
      <section className='container'>
            <div className={ bannerPhoto.banner_container}>
              <div className='banner_content_wrapper'>
                  <h4>Streamline Your Content Management with Our Powerful CMS Platform!.</h4>
                  <p className='mt-2'>Unlock the Power of Knowledge with Expert Insights and Inspiring Ideas.</p>
                  <button type='button' onClick={()=>navigate('/admin/create-post-form')}>Create post</button>
              </div>
            </div>
      </section>
    )
  }

  return (
    <>
    {data.message.map(item=>(
      <div className="container card text-black" key={item._id} style={{marginTop: "5rem"}}>
        <img src={item.banner_image_link} className="card-img img-fluid" loading='lazy' alt="banner_image" style={styleBgImg} />
        <div className="card-img-overlay text-wrap" style={{width: "35rem"}}>
          <h5 className="card-title mt-5">{item.title}</h5>
          <p className="card-text mt-4">{item.banner_content}</p>
          <p className="card-text">Last updated: {new Date(item.updatedAt).toDateString()}</p>
        </div>
      </div>
      ))}
    </>
  )
}
