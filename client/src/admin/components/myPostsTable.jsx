import React from 'react';
import {EditMyPostModal} from './Edit-mypost-modal';
import { useRef, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance'
import {handleAxiosError} from '../../utils/handleAxiosError';
import {ErrorAlert} from './ErrorAlert';
import {AdvanceLoading} from './AdvanceLoading';
import {deleteFileInFirebaseDb} from '../../utils/delete_file_in_firebasedb';
import btnColorBg from '../asset/css/css_modules/button-style.module.css'


export default function MyPostsTable({currentUserPosts, increasePage, isFetching, isPreviousData, currentPage, decreasePage, setquerykey}) {

const location = useNavigate()
const [status, setStatus] = useState('');
const [alert, setAlert] = useState(false);


    const editBtns = useRef()
    const {id}=useParams();

    function handleEditMyPost(id){
        return location(`/admin/my-post/${id}`);
    }

    async function handleDeletePost(id, firebaseRef){
        try{
             setStatus('loading');
            const deleteFirebase = await deleteFileInFirebaseDb(firebaseRef);
            console.log(deleteFirebase)
            const deletePostPromise = await axiosInstance({
                method:'delete',
                url:`/blog/post/${id}`
            })
            if(deletePostPromise.status === 200){
                setStatus('success');
                window.alert('Deleted')
            }
            
        }catch(err){
          const error = handleAxiosError(err);
          console.log(error)
          if(error){
            setAlert(true)
            setStatus('error')
           }
        } 
    }


    if(currentUserPosts?.length <= 0){
        return(
            <div className='d-flex justify-content-center align-items-center text-align-center bg-warning p-4'>No post yet</div>
        )
    }
    return ( 
        <>
            <div className='table-responsive'>
                
                { status ==='error'?<ErrorAlert alert={alert} setAlert={setAlert}> Some went wrong </ErrorAlert>:''}

                <table className="table table-hover caption-top table-bordered">
                    <caption>List of my posts</caption>
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Category</th>
                            <th scope="col">Content</th>
                            <th scope="col">Image</th>
                            <th scope="col">Edit post</th>
                            <th scope="col">Delete post</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUserPosts?.map((myPosts)=>(
                    
                                <tr key={myPosts._id}>
                                    <th scope="row">{myPosts._id.substr(0, 7)}</th>
                                    <td><Link to={"/blog/post/"+myPosts._id}>{myPosts.title.length > 30 ? myPosts.title.substr(0, 30) +'......':myPosts.title}</Link></td>
                                    <td>{myPosts.category}</td>
                                    <td>{myPosts.content.length > 50? myPosts.content.substr(0, 50) +'.....':myPosts.content}</td>
                                    <td>
                                        <img src={myPosts.image_link} alt='' loading='lazy' width='60rem' height='60rem' style={{objectFit:'contain'}}/>
                                    </td>

                                    <td>
                                        <button ref={editBtns} className={btnColorBg.secondaryBtnColorBg} onClick={()=>handleEditMyPost(myPosts._id)} data-bs-toggle="modal" data-bs-target="#editMyPostModal">
                                            Edit
                                        </button>
                                    </td>

                                    <td>
                                            <button className={btnColorBg.primaryColorBg} onClick={()=>handleDeletePost(myPosts._id, myPosts.storage_ref)}>
                                                Delete
                                            </button>
                                    </td>
                                </tr>
                                
                        ))} 
                    
                    </tbody>
                </table>
                    <br/>
                
                <EditMyPostModal id={id} setquerykey={setquerykey}/>
                    
            </div>

                <span className='me-2'>Current Page: {currentPage + 1}</span>

                <button className={btnColorBg.primaryColorBg}  onClick={() => decreasePage()} disabled={currentPage===0}>Previous</button>

                <button className='btn ms-2' onClick={()=>increasePage()} disabled={currentUserPosts?.length < 5}>Next</button>
    </>
  )
}