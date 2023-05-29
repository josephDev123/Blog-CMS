
import '../../css/landing-page.css'
import { useLayoutEffect, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {handleIntersect} from  '../../utils/handleIntersect'


export default function LandingPage() {
  
  const ref = useRef()
  const image_container_el = useRef()
  
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  useLayoutEffect(()=>{
    document.title = 'Home || Welcome'
    return ()=>{
        document.title = ''
    }
  });

  useEffect(()=>{
    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(ref.current);

    const observerImage_container = new IntersectionObserver(handleIntersect, options);
    observerImage_container.observe(image_container_el.current);
  });


  const navigate = useNavigate();
 
  return (
    <div className='landing_container container mt-4'>
       <div className='content-fontsize'>
        <h2>What We Do: Power Your Blog with Our CMS Software</h2>
          <p>At our core, we believe that every blogger should have access to powerful and user-friendly content
             management software that makes it easy to create and share engaging content online. 
             That's why we've developed our cutting-edge CMS software, designed specifically for bloggers like you.</p>
       </div>

      <div className='landing_page_action_wrapper'>
          <div className='landing_page_action_action d-status' ref={ref}>
                <h3> Upgrade Your Blogging Experience with a Modern CMS</h3>
                <p>Are you tired of managing your blog with clunky, outdated software? Say goodbye to the hassle and
                   switch to a modern CMS today! With our user-friendly platform, you'll be able to create, publish, 
                   and manage your content with ease. Don't let your blog suffer from outdated technology any longer. 
                   Take action and upgrade to a better blogging experience now!
                </p>
                <span>
                  <button type='button' onClick={()=>navigate('/admin/create-post-form')}>Create Content</button>
                  <button type='button' onClick={()=>navigate('/blogs-post')}>Get Started</button>
                </span>
          </div>
          <div className='landing_page_action_side_image' ref={image_container_el}>
                <img src={process.env.PUBLIC_URL+'/images/blog1.jpg'} alt='landing create ' style={{width:'100%'}} />
          </div>

      </div>
       
    </div>
  )
}
