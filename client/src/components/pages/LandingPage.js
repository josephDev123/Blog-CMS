
import {Heading} from '../Heading'
import '../../css/Search_gallery_layout_container.css'
import {useSelectCategory} from '../../customHooks/useSelectCategory';
import {useState} from 'react';
import IndexGallery from '../index_gallery';

export default function LandingPage() {
 

  // const {isLoading, isError, error, data} = useSelectCategory(`http://localhost:7000/blog/all-post/categories`);
  // console.log(data);

  return (
    <div className='Search_gallery_layout_container container mt-4'>
       {/* <Heading/>
       <IndexGallery isLoading={isLoading} isError= {isError} error={error} data={data}/> */}
    </div>
  )
}
