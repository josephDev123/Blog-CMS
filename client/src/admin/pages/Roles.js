
import  {useState, useLayoutEffect} from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import '../asset/css/roles.css';
import {useFetch} from '../../customHooks/useFetch';
// import {SimpleAlert} from './SimpleAlert';
import {ModalComponent} from '../components/Modal';
import {SuccessAlert} from '../components/SuccessAlert';
import {ErrorAlert} from '../components/ErrorAlert'
import {RoleBanner} from '../components/RoleBanner'
import {AdvanceLoading} from '../components/AdvanceLoading'

export default function Roles() {
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState('');
    const [remount, setReMount] = useState(false);
    const [show, setShow] = useState(false);
    const [userid, setUserId] = useState('');
    const [alert, setAlert] = useState(false);
    const [err, setErr] = useState(null);

    useLayoutEffect(()=>{
      document.title = 'Role Page';
  }, [])

    function handleShowModal(userId){
      setShow(true);
      setUserId(userId)
    }

    const {isLoading, isError, data, error, isFetching} = useFetch('http://localhost:7000/profile/users', page)


    //handle the user permission btn
    async function handleUserPermission(){
   
      try {
        const rolePermissionReq =await axios({
        url:`http://localhost:7000/role/users-permission`,
        method:'POST',
        params: {
          ID: userid
        }
      });
      const rolePermissionResult = await rolePermissionReq.data;
      if(rolePermissionResult === 'success'){
        setStatus('success');
        setAlert(true)
        setReMount((status)=>!status);
      }
      
      } catch (error) {
        setErr(error.message);
        setStatus('danger');
        setAlert(true)
      }
   
    }


    
  return(
        <section className='container'>
          <ModalComponent showModal={show} setShowModal = {setShow} event={handleUserPermission}>
            change user's permission status
          </ModalComponent>

            <span className='tag'>
            /Roles
          </span>

            {/* banner head */}
            <RoleBanner/>
          
            <section className=''>
               {isLoading? (
              <AdvanceLoading/>
               ):isError? <div className="alert alert-danger mt-4" role="alert"> {error.message} </div>:(
                <div className='container mt-4 table-responsive'>
                  {status==='success'?<SuccessAlert alert ={alert}  setAlert={setAlert}/>:<ErrorAlert alert ={alert} setAlert={setAlert}/>}
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
                            <td><button className='btn btn-primary btn-sm' onClick={()=>handleShowModal(users._id)}> user permission</button></td>
                          </tr>
                        
                        </tbody>
                    </table>
                      ))
                    }

{/* //)=>handleUserPermission(users._id) */}
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
