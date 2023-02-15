import { useState } from "react";
import axiosInstance from '../../utils/axiosInstance';
import Loading from './Loading'
import {SuccessAlert} from './SuccessAlert'
import {ErrorAlert} from './ErrorAlert';
import {fileUpload} from '../../utils/fileUpload';
import {deleteFileInFirebaseDb} from '../../utils/delete_file_in_firebasedb';
import {AdvanceLoading} from './AdvanceLoading';
// import {SimpleAlert} from './SimpleAlert';

export function EditMypostForm({data}){
    const[title, setTitle] = useState('');
    const[category, setCategory] = useState('');
    const[file, setFile] = useState('');
    const[post, setPost] = useState('');
    const[firebaseImgUrl, setFirebaseImgUrl] = useState('');
    //GETTING THE FIREBASE STORAGE REF TO SEND TO MONGODB. IT IS IMPORTANCE WHEN U WANT TO DELETE THE FILE FROM FIREBASE
    const[mongodbFirebaseRef, setMongodbFirebaseRef] = useState('');
    const[status, setStatus] = useState('unactive');
    const[imgStatus, setImgStatus] = useState('');
    const[alert, setAlert] = useState(false);

    console.log(imgStatus)

   async function submitEditPost(e){
        e.preventDefault()
            setStatus('loading');
            try {
                    //making edit post request
                    const editPostRequest = await axiosInstance({
                        method:'put',
                        url: `blog/edit/${data[0]._id}`,
                        data: { 
                            // 'creator': data[0].creator,
                            'storage_ref': mongodbFirebaseRef? mongodbFirebaseRef: data[0].storage_ref,
                            'firebaseImage_link': firebaseImgUrl? firebaseImgUrl: data[0].image_link,
                            'title': title? title : data[0].title,
                            'category': category ? category :data[0].category,
                            'blogPost': post?post:data[0].content
                        }
                    })
        
                    if(editPostRequest.status === 200){
                        setStatus('success');
                        setAlert(true)
                    }
                 
            } catch (error) {
                setStatus('error');
                setAlert(true)
            }
   }


        function handleChangeFileupload(file){
                setFile(file.target.files[0]);
        }

        function cb(imgStatusLoading){
            setImgStatus(imgStatusLoading);
        }

   async function handleFileDeployImagetoFirebaseToGetUrl(ImageRef){
        try {
            // delete the fileurl from firebase db first
            await deleteFileInFirebaseDb(ImageRef);
            const [firebaseImgUrl, fileRef ] = await fileUpload(file, cb, 'blog_image_destination');
         
            setFirebaseImgUrl(firebaseImgUrl);
            setMongodbFirebaseRef(fileRef);
            setImgStatus('uploaded')
            setAlert(true)
        } catch (error) {
            setImgStatus('error');
        }
    
   }

    // console.log(data);
    return (
        <form style={{marginTop:'2px', marginBottom:'2px'}} onSubmit={submitEditPost}>
            {status==='success'? <SuccessAlert alert={alert} setAlert={setAlert}>Edit successful</SuccessAlert>:''}
            {status === 'error'? <ErrorAlert alert={alert} setAlert={setAlert}>Something went wrong</ErrorAlert>:''}
            <div className="mb-3" >
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" onChange={(e)=>setTitle(e.target.value)} aria-describedby="emailHelp" defaultValue={data[0]?.title}/>
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <input type="text" className="form-control" id="category" onChange={(e)=>setCategory(e.target.value)} defaultValue={data[0]?.category}/>
            </div>
            <div className="mb-3">
                <label htmlFor="content" className="form-label">Content</label>
                <textarea className="form-control" id="content" onChange={(e)=>setPost(e.target.value)} defaultValue={data[0]?.content}></textarea>
            </div>

            <div className="mb-3">
               { imgStatus === 'loading' ? <AdvanceLoading/> : '' }
               { imgStatus === 'error'? <ErrorAlert> Something went wrong </ErrorAlert> : '' }
               { imgStatus === 'uploaded'? <SuccessAlert alert={alert} setAlert={setAlert}> File prepared for upload </SuccessAlert>: '' }
            </div>

             <div className="mb-3">
                <img src={data[0]?.image_link} alt='post-image' className='img-responsive img-thumbnail' width='200' height='200'/>
            </div>

           <div className="mb-3">
                {/* <label htmlFor="image" className="form-label">image</label> */}
                <input type="file" className="form-control mb-2" id="image" onChange={(e)=>handleChangeFileupload(e)}/>
                <button type='button' className='btn btn-primary' onClick={()=>handleFileDeployImagetoFirebaseToGetUrl(data[0]?.storage_ref)}> confirm image </button>
            </div>

            {status === 'loading' ? <Loading> Loading... </Loading> : <button type="submit" className="btn btn-primary">Save Changes</button>}

        </form>
    )
}