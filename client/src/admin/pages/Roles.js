
import  {useState, useLayoutEffect , useContext} from 'react';
import axiosInstance from '../../utils/axiosInstance';
import '../asset/css/roles.css';
// import {useReqHttp} from '../../customHooks/useReqHttp';
import { useQuery } from "react-query";
import {ModalComponent} from '../components/Modal';
import {SuccessAlert} from '../components/SuccessAlert';
import {ErrorAlert} from '../components/ErrorAlert'
import {RoleBanner} from '../components/RoleBanner'
import {AdvanceLoading} from '../components/AdvanceLoading'
import btn_styles from '../asset/css/css_modules/button-style.module.css'
import {AuthContext} from '../../Context/AuthContext'


export default function Roles() {

    const [page, setPage] = useState(1);
    const [status, setStatus] = useState('');
    const [refetch, setRefetch] = useState(false);
    const [show, setShow] = useState(false);
    const [userid, setUserId] = useState('');
    const [alert, setAlert] = useState(false);
    const [err, setErr] = useState(null);

    const {isAuthUser} = useContext(AuthContext)

    useLayoutEffect(()=>{
      document.title = 'Role Page';
  }, [])

    function handleShowModal(userId){
      setShow(true);
      setUserId(userId)
    }

    const {isLoading:isLoadingUser,
      isError:isErrorUser, 
      data:dataUser, 
      error:errorUser, 
      isFetching:isFetchingUser} = useQuery(['AuthenticatedUser', refetch], async ()=>{
       try{
         const req = await axiosInstance({
           method:'get',
           url: `profile/get-user-profile/${isAuthUser}`,
          //  params:{
          //    'query':isAuthUser
          //  }
         })
         const user = await req.data;
         return user;
       }catch(error){
          throw new Error(error);
       }
      
    })

    console.log(dataUser)

    // const {isLoading, isError, data, error, isFetching} = useReqHttp('profile/users', '', page, refetch, '', true)
const {isLoading:isLoadingUsers,
   isError:isErrorUsers, 
   data:dataUsers, 
   error:errorUsers, 
   isFetching:isFetchingUsers} = useQuery(['roles', refetch], async ()=>{
    try{
      const req = await axiosInstance({
        method:'get',
        url: 'profile/users',
        params:{
          'query':page
        }
      })
      const users = await req.data;
      return users;
    }catch(error){
       throw new Error(error)
    }
   
}, { keepPreviousData : true, enabled: dataUser && dataUser.length > 0})


    //handle the user permission btn
    async function handleUserPermission(){
   
      try {
        const rolePermissionReq =await axiosInstance({
        url:`role/users-permission`,
        method:'POST',
        params: {
          ID: userid
        }
      });
      const rolePermissionResult = await rolePermissionReq.data;
      if(rolePermissionResult === 'success'){
        setStatus('success');
        setAlert(true)
        setRefetch((status)=>!status);
      }
      
      } catch (error) {
        setErr(error.message);
        setStatus('danger');
        setAlert(true)
      }
   
    }


    
  return(
        <section className='container mt-4'>
          <ModalComponent showModal={show} setShowModal = {setShow} event={handleUserPermission}>
            change user's permission status
          </ModalComponent>

            <span className='tag' style={{marginBottom:'1rem'}}>
            /Roles
            </span>

            {/* banner head */}
            <RoleBanner/>
          
            <section className=''>
               {isLoadingUsers? (
              <AdvanceLoading/>
               ):isErrorUsers? <div className="alert alert-danger mt-4" role="alert"> Something went wrong </div>:(
                <>
                <div className='container mt-4 table-responsive'>
                  {status==='success'?<SuccessAlert alert ={alert}  setAlert={setAlert}/>:<ErrorAlert alert ={alert} setAlert={setAlert}/>}
                   
                      <table className="table table-striped table-hover table-borderless caption-top">
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
                        {
                    dataUsers?.map(users =>(
                          <tr key={users._id}>
                            <th scope="row">{users._id.substr(0, 5)}</th>
                            <td>{users.name}</td>
                            <td>{users.title}</td>
                            <td>{users.about.substr(0, 20)} ....</td>
                            <td>{users.phone}</td>
                            <td>{users.surname}</td>
                            <td>{users.role.user && users.role.admin? users.role.user +' || admin': users.role.user}</td>
                            <td>
                              {dataUser.map(role=>(
                                !role.admin? <fragment key={role._id}>Action is for <button className='btn btn-secondary' disabled>Admins</button></fragment>: 
                                <button key={role._id} className={btn_styles.secondaryBtnColorBg} onClick={()=>handleShowModal(users._id)}> user permission</button>
                              ))}
                            </td>
                          </tr>
                           ))
                         }   
                        </tbody>
                    </table>
                    
                  </div>
                  <span>Current Page: {page}{' '}</span>
                          <button className={btn_styles.primaryColorBg}
                            onClick={() => setPage(page => page - 1)}
                            disabled={page === 1}
                          >
                            Previous Page
                          </button>{' '}
                          <button className='btn'
                            onClick={() => {
                              // if (!isPreviousData && data.hasMore) {
                                setPage(old => old + 1)
                              // }
                            }}
                            // Disable the Next Page button until we know a next page is available
                            disabled={dataUsers.length <= 5}
                          >
                            Next Page
                          </button>
                          {isFetchingUsers ? <span className='alert alert-warning'> Loading...</span> : null}{' '}
                  </>
               )}
            </section>
      
        </section>

  )


}
