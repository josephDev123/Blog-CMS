
import '../../css/landing-page.css'
import {useState, useLayoutEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';


export default function LandingPage() {
  useLayoutEffect(()=>{
    document.title = 'Home || Welcome'
    return ()=>{
        document.title = ''
    }
  }, []);

  const navigate = useNavigate();


  // const {isLoading, isError, error, data} = useSelectCategory(`http://localhost:7000/blog/all-post/categories`);
  // console.log(data);

  return (
    <div className='landing_container container mt-4'>
       <div className='content-fontsize'>
        <h2>What We Do: Power Your Blog with Our CMS Software</h2>
          <p>At our core, we believe that every blogger should have access to powerful and user-friendly content
             management software that makes it easy to create and share engaging content online. 
             That's why we've developed our cutting-edge CMS software, designed specifically for bloggers like you.</p>
       </div>

      <div className='landing_page_action_wrapper'>
          <div className='landing_page_action_action'>
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
          <div className='landing_page_action_side_image'>
                <img src={process.env.PUBLIC_URL+'/images/blog1.jpg'} alt='landing create image' style={{width:'100%'}} />
          </div>

      </div>
       
    </div>
  )
}
