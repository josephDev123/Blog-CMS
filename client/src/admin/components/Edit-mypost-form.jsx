import { useState } from "react";
import axiosInstance from '../../utils/axiosInstance';
import Loading from './Loading'
import {SuccessAlert} from './SuccessAlert'
import {ErrorAlert} from './ErrorAlert'

export function EditMypostForm({data}){
    const[title, setTitle] = useState('');
    const[category, setCategory] = useState('');
    const[post, setPost] = useState('');
    const[status, setStatus] = useState('unactive');
    const[alert, setAlert] = useState(false);

console.log(status)

   async function submitEditPost(e){
        e.preventDefault()
        if(!title || !category || !post){
            console.log('field cannot be empty')
        }else{
             setStatus('loading');
            try {
               
                //making edit post request
                const editPostRequest = await axiosInstance({
                     method:'POST',
                     url: `/blog/edit/${data[0]._id}`,
                     data: { title, category, post }
                 })
     
                 if(editPostRequest.status === 200){
                     setStatus('success');
                 } 
            } catch (error) {
                setStatus('error');
            }
           
        }
   }

    // console.log(data);
    return (
        <form style={{marginTop:'2px', marginBottom:'2px'}} onSubmit={submitEditPost}>
            <SuccessAlert alert={alert} setAlert={setAlert}>Edit successful</SuccessAlert>
            {status === 'error'? <ErrorAlert alert={alert} setAlert={setAlert}>Something wrong</ErrorAlert>:''}
            <div className="mb-3" >
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" onChange={(e)=>setTitle(e.target.value)} aria-describedby="emailHelp" defaultValue={data[0].title}/>
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <input type="text" className="form-control" id="category" onChange={(e)=>setCategory(e.target.value)} defaultValue={data[0].category}/>
            </div>
            <div className="mb-3">
                <label htmlFor="content" className="form-label">Content</label>
                <textarea className="form-control" id="content" onChange={(e)=>setPost(e.target.value)} defaultValue={data[0].content}></textarea>
            </div>
            {/* <div className="mb-3">
                <label htmlFor="image" className="form-label">image</label>
                <input type="file" className="form-control" id="image"/>
            </div> */}
            {/* <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <input type="text" className="form-control" id="category"/>
            </div> */}

            {status === 'loading' ? <Loading> Loading... </Loading> : <button type="submit" className="btn btn-primary">Save Changes</button>}

        </form>
    )
}