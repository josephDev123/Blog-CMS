import React from 'react'
import '../css/gallery.css';
import {useState} from 'react';
import { Link } from 'react-router-dom';
// import { useFetch } from '../customHooks/useFetch';
import {useReqHttp} from '../customHooks/useReqHttp';

export default function Gallery({category}) {
  const [page, setPage]= useState(1);

  const { isLoading, isError, error, data, isFetching, isPreviousData} = useReqHttp('/blog/post/bycategories', page, category, page, '', true);
// console.log('from gallery '+ data)

  if(isLoading){
    return <div className="spinner-grow" role="status"><span className="visually-hidden">Loading...</span></div>
  }

  if(isError){
       return <div className='container'>{error.message}</div>
  }

  return (
    <div>
      <div className='gallery_container'>
          {data.map(posts=>(
            <div key={posts._id} className='gallery_content'>
                <img src={posts.image_link} alt='post' className='blog_img_heading' width='100%'/>
                <h3>{posts.title}</h3>
                <p>{posts.content}</p>
                <p>{new Date(posts.createdAt).toDateString()}</p>
                <Link to={'/blog/post/'+posts._id}>
                  <button type='button' className='btn btn-primary btn-sm'>
                    read more
                  </button>
                </Link>
            </div>
          ))}
          
       </div>
       <span style={{display:'flex', gap:'0.4rem'}}>
          <button className='btn btn-primary btn-sm'>Previous Page</button>
           <button className='btn btn-secondary btn-sm'>Next Page</button>
        </span>
    </div>
       
  )
}
