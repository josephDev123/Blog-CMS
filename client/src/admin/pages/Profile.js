import React from 'react'
import '../asset/css/profile.css';
import { useContext, useEffect,useState, useLayoutEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import EditProfile from '../components/EditProfile';
import {UploadProfile} from '../components/UploadProfile';
import { useQuery } from 'react-query';
import Button from 'react-bootstrap/Button';
import { useFetch } from '../../customHooks/useFetch'; 
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios';

export default function Profile() {  

  const {isAuthUser} = useContext(AuthContext);
  const [enactRender, setEnactRender] = useState('');
  const [show, setShow] = useState(false);

  useLayoutEffect(()=>{
    document.title = 'Profile Page';
}, [])

  // open modal 
  const handleShow = () => setShow(true);

  // handle how to display  upload btn and edit btn based on number of data are in the collection(the upload btn and edit btn shouldn't be display at the same time)
  // let {isLoading:isCountLoading, isError:isCountError, data:isCountData, error:countError} this code is correct
  let profileCount = useFetch('http://localhost:7000/profile/profile-count', enactRender)


  const { isLoading, isError, data, error } = useQuery(['profile', isAuthUser], async ()=>{
          try {
            const fetchUserProfile = await axios(`http://localhost:7000/profile/get-user-profile/${isAuthUser}`);

            const UserProfile = await fetchUserProfile.data;
            return UserProfile;
          } catch (error) {
            return error.message;
          }
     
  })

  function handleEditProfile(){
    setShow(true)
  }


  return(
        <div className='container mt-4'>
             <span className='tag'>
              /Profile
            </span>
             <section className='header_banner mt-2'>
               <div className='banner_avatar_wrapper'>
                   <img className='banner_avatar' src='/admin/asset/images/undraw_profile_pic.png' alt='avatar' style={{height:'10rem'}} />
               </div>
             
               <div className='content'>
                    {isLoading?<Spinner animation="border" role="status" size="sm"><span className="visually-hidden">Loading...</span></Spinner>:isError?<h4>{error.message}</h4>:data.length ===0?<>No profile</>:(
                      <>
                      
                          <h4> <i className="fa-solid fa-user-plus" style={{ color:'#f4a261', marginRight:'0.7rem' }}></i>{data[0].name}</h4>
                        <h4> <i className="fa-solid fa-user-doctor" style={{ color:'#f4a261', marginRight:'0.7rem' }}></i>{data[0].title}</h4>
                        <p><i className="fa-solid fa-address-card" style={{ color:'#f4a261', marginRight:'0.7rem' }}></i>{data[0].about}</p> 
                      </>
                    )}
                  
               </div>
     
               {
                profileCount.isLoading?<Spinner animation="border" role="status" size="sm"><span className="visually-hidden">Loading...</span></Spinner>:
                profileCount.isError? <Button type='button' className='btn btn-danger'>profile btn invisible due to error</Button>:
                profileCount.data.count === 0? <Button variant='primary' className='upload_btn' onClick={handleShow}>upload profile </Button>:
                profileCount.data.count > 0? <Button type='button' className='edit_btn' onClick={handleEditProfile}>Edit profile</Button>:''
             }
              
             </section>

              
                {isLoading?(<div className=' m-2 container'><button className="btn btn-primary" type="button" disabled>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Loading...
                </button></div>
                )
                :isError? <div className="alert alert-danger container m-2" role="alert">{error.message}</div>:data.length === 0 ?(
                  <>
                  <UploadProfile trigger={setEnactRender} showModal={show} setShowModal={setShow}/>
                  <div className="alert alert-danger container m-2" role="alert">No profile data. Upload your profile</div>
                </>
                ):(
                <section key={data[0]._id} className='mt-4 social_media_wrapper'>
                <div className='badge'>
                  <span style={{ color:'#e9c46a', marginRight:'0.7rem' }}><i className="fa-solid fa-envelope-circle-check"></i></span> <span className='email'>{isAuthUser}</span>
                </div>
                <div className='badge'>
                  <span style={{ color:'#e9c46a', marginRight:'0.7rem' }}><i className="fa-solid fa-phone"></i></span> <span className='phone'>{data[0].phone}</span>
                </div>
         
    
                <div className='badge'>
                  <span style={{ color:'#e9c46a', marginRight:'0.7rem' }}><i className="fa-solid fa-file-signature"></i></span> <span className='username'>{data[0].surname}</span>
                </div>

                      
           {/* edit modal  */}
               <EditProfile profile ={data[0]} show={show} setShow={setShow} trigger={setEnactRender}/>
            </section>
            )}
         </div>
    
  
  )
}

