import react from 'react';
import '../../css/blog-post.css'
import Search from '../search';
import { useState, useLayoutEffect } from 'react';
import {useSelectCategory} from '../../customHooks/useSelectCategory';
import Gallery from '../gallery'

export const Blogs =()=>{
    useLayoutEffect(()=>{
        document.title = 'Blogs || Posts'
        return ()=>{
            document.title = ''
        }
    }, [])
  const [category, setCategory] = useState('');
  const {isLoading, isError, error, data} = useSelectCategory(`http://localhost:7000/blog/all-post/categories`);

    return(
        <div className='container blog_post_container mt-4'>
            <Search setcategory ={setCategory} isLoading ={isLoading} isError={isError} error = {error} data = {data}/>
            <Gallery category={category}/>
        </div>
    )
}