
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

      <div className='landing_page_action_wrapper'>
          <div className='landing_page_action_action'>
                <h3> specific feature component</h3>
                <p>When building a small project it was good for me to put all
                   the components in components folder and call them in different pages 
                </p>
                <span>
                  <button>Create Content</button>
                  <button>Get Started</button>
                </span>
          </div>
          <div className='landing_page_action_side_image'>
                <img src={process.env.PUBLIC_URL+'/images/blog1.jpg'} alt='' style={{width:'100%'}} />
          </div>

      </div>
       
    </div>
  )
}
