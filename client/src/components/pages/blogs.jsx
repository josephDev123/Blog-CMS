
import '../../css/blog-post.css'
import Search from '../search';
import { useState, useLayoutEffect } from 'react';
import {useReqHttp} from '../../customHooks/useReqHttp';
import Gallery from '../gallery'

export const Blogs =()=>{
    useLayoutEffect(()=>{
        document.title = 'Blogs || Posts'
        return ()=>{
            document.title = ''
        }
    }, [])
  const [category, setCategory] = useState('');
  const {isLoading, isError, error, data} = useReqHttp('/blog/all-post/categories');
  console.log(isError, error, data)

    return(
        <div className='container blog_post_container mt-4'>
            <Search setcategory ={setCategory} isLoading ={isLoading} isError={isError} error = {error} data = {data}/>
            <Gallery category={category}/>
        </div>
    )
}