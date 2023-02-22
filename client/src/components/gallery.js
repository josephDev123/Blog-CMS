import React from 'react'
import '../css/gallery.css';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../customHooks/useFetch';

export default function Gallery({category}) {
  const [page, setPage]= useState(1);

  const { isLoading, isError, data, error} = useFetch('http://localhost:7000/blog/post/bycategories', category);
console.log('from gallery '+ data)
  if(isLoading){
    return <div className="spinner-grow" role="status"><span className="visually-hidden">Loading...</span></div>
  }

  if(isError){
       return <div className='container'>{error.message}</div>
  }

  return (
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
  )
}
