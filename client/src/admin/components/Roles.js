import React from 'react';
import  {useState} from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import '../asset/css/roles.css';
import {useFetch} from '../../customHooks/useFetch';
// import Modal from './Modal';

export default function Roles() {
    const [page, setPage] = useState(1);
    const [status, isStatus] = useState('');
    const [remount, setReMount] = useState(false);

    const {isLoading, isError, data, error, isFetching} = useFetch('http://localhost:7000/profile/users', page)
    


    console.log(data)

    //handle the user permission btn
    async function handleUserPermission(userId){

      try {
        const rolePermissionReq =await axios({
        url:`http://localhost:7000/role/users-permission`,
        method:'POST',
        params: {
          ID: userId
        }
      });
      const rolePermissionResult = await rolePermissionReq.data;
      isStatus('success');
      setReMount(true);
      alert("user permission changed");
      } catch (error) {
        isStatus('error');
        alert("user permission failed");
      }
    }

    
  return(
        <section className='container'>
            <span className='tag'>
            /Roles
          </span>
            <section className='roles_billboard'>
                <section className='img_wrapper'>
                    <img className='img' src='/images/permission.png' width='' height='' alt=''/>
                </section>

                <section className='content_wrapper'>
                    <blockquote>
                        <p>Success means doing the best we can with what we have. Success is the doing, not the getting; in the trying, not the triumph. Success is a personal standard, reaching for the highest that is in us, becoming all that we can be.” - Zig Ziglar</p>

                    </blockquote>

                    <blockquote>
                        <p>“Failure is not the opposite of success; it’s part of success.” - Arianna Huffington</p>
                    </blockquote>
                </section>
            </section>
          
            <section className=''>
               {isLoading? (
                <>
                   <button className="btn btn-primary me-2" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span className="visually-hidden">Loading...</span>
                  </button>
                  <button className="btn btn-primary" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                  </button>
                </>
               ):isError? <div className="alert alert-danger mt-4" role="alert"> {error.message} </div>:(
                <div className='container mt-4 table-responsive'>
                    {
                    data?.map(users =>(
                      <table key={users._id} className="table table-striped table-hover table-borderless caption-top">
                        <caption>List of users and roles</caption>
                        <thead className='table-dark'>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Fullname</th>
                            <th scope="col">Title</th>
                            <th scope="col">About</th>
                            <th scope="col">Phone</th>
                            <th scope="col">username</th>
                            <th scope="col">role</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">{users._id.substr(0, 5)}</th>
                            <td>{users.name}</td>
                            <td>{users.title}</td>
                            <td>{users.about.substr(0, 20)} ....</td>
                            <td>{users.phone}</td>
                            <td>{users.surname}</td>
                            <td>{users.role.user && users.role.admin? users.role.user +' || admin': users.role.user}</td>
                            <td><button className='btn btn-primary btn-sm' onClick={()=>handleUserPermission(users._id)}> user permission</button></td>
                          </tr>
                        
                        </tbody>
                    </table>
                      ))
                    }

              <span>Current Page: {page}</span>
                          <button className='btn btn-primary'
                            onClick={() => setPage(page => page - 1)}
                            disabled={page === 1}
                          >
                            Previous Page
                          </button>{' '}
                          <button className='btn btn-secondary'
                            onClick={() => {
                              // if (!isPreviousData && data.hasMore) {
                                setPage(old => old + 1)
                              // }
                            }}
                            // Disable the Next Page button until we know a next page is available
                            disabled={data.length <= 5}
                          >
                            Next Page
                          </button>
                          {isFetching ? <span className='alet alert-warning'> Loading...</span> : null}{' '}
                          
                  </div>
               )}
            </section>
      
        </section>

  )


}
