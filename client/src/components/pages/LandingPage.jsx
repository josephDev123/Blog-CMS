
// import {Heading} from '../Heading'
import '../../css/landing-page.css'
import {useSelectCategory} from '../../customHooks/useSelectCategory';
import {useState, useLayoutEffect} from 'react';
import IndexGallery from '../index_gallery';

export default function LandingPage() {
  useLayoutEffect(()=>{
    document.title = 'Home || Welcome'
    return ()=>{
        document.title = ''
    }
  }, []);

  // const {isLoading, isError, error, data} = useSelectCategory(`http://localhost:7000/blog/all-post/categories`);
  // console.log(data);

  return (
    <div className='landing_container container mt-4'>
       <div className='content-fontsize'>
          <p>If you're like most designers and marketers, you search for illustrations in Google Images.</p>
       </div>

      <div className='landing_page-flow'>
          <div>
                <h3>Heading</h3>
                <p>Paragraph</p>
                <span>
                  <button>Create Content</button>
                  <button>Get Started</button>
                </span>
          </div>
          <div>
                <img src='' alt='' style={{width:'100%', height:'100%'}} />
          </div>

      </div>
       
    </div>
  )
}
