import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useQuery } from 'react-query';
// import {AuthContext} from '../../Context/AuthContext';
import {AuthContext} from '../../../Context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function IsAdmin({children}) {

  //router redirect
  const navigate = useNavigate();
     
  //context
  const {isAuthUser} = useContext(AuthContext);
  
  //fetch
  const {isLoading, isError, isSuccess, data, error} = useQuery(['user', isAuthUser], async ()=>{
    try{
      const user = await axios({
        url: `http://localhost:7000/profile/get-user-profile/${isAuthUser}`,
        method: 'get'
      })
      const res = await user.data;
      return res;
    }catch(error){
      return error.message;
    }
  })

// console.log(data);
//data loading stage
  if (isLoading) {
    return (
      <div className='container'>
      <button className="btn btn-primary me-2" type="button" disabled>
       <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
       <span className="visually-hidden">Loading...</span>
     </button>
     <button className="btn btn-primary" type="button" disabled>
       <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
       Loading...
     </button>
   </div>
    )
  }

  //if there is an error
  if (isError) {
    return (
      <div className="container alert alert-danger mt-4" role="alert"> {error.message} </div>
    )
  }
   
  //success stage
  return (
      <>
      {
        data.map(user =>{
            if(isAuthUser !== user.postedBy){
              return navigate("/admin");
            }
            return <div key={user._id}>{children}</div>
        })
      }
    </>
    )
  
}
