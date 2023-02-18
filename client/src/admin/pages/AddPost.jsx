import React, { useContext } from 'react';
import { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import MDEditor from '@uiw/react-md-editor';
import {fileUpload} from '../../utils/fileUpload';
import {AdvanceLoading} from '../components/AdvanceLoading';
import {SimpleAlert} from '../components/SimpleAlert'


export default function AddPost() {

    const [title, setTitle] = useState('');
    const [categories, setCategories] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const[status, setStatus] =useState('');
    const [firebaseImageLink, setFirebaseImageLink] = useState('');
    const[alert, setAlert] = useState(false)

    const [firebaseImagedeployingStatus, setfirebaseImagedeployingStatus] = useState('');
    const [storageRefDb, setStorageRefDb] = useState('');
   

    const imageRef = useRef('');

    const {isAuthUser} = useContext(AuthContext);

    useLayoutEffect(()=>{
      document.title = 'Create Post Page';
  }, [])
  
    const handleFileUpload = (e)=>{
        setImage(e.target.files[0])
    }

    function handlefileUploadProgressCallback(message){
       console.log(message)
       setfirebaseImagedeployingStatus(message)
    }

    // uploading image or files to firebase storage in order to get the image link/firestore ref for the post 
    const confirmUploadImage = async (e)=>{
      e.preventDefault()
      if(!image){
        setStatus('empty');
      }else{
        //  setfirebaseImagedeployingStatus('loading')
        const [fileuploaded, ref] = await fileUpload(image, handlefileUploadProgressCallback, 'blog_image_destination')
        .catch(e=> setfirebaseImagedeployingStatus('error'))

        console.log(fileuploaded, ref);
        setFirebaseImageLink(fileuploaded);
        setStorageRefDb(ref);
      }
    }


// handles the submission of post
    const handlePostSubmit = (e)=>{
        e.preventDefault()
        if(firebaseImageLink === undefined || firebaseImageLink === null 
            || firebaseImageLink === '' || title === '' || categories === '' 
            || content === '' || storageRefDb ===''){
          setStatus('empty');
        }else{
          setStatus('loading');
          axios.post('http://localhost:7000/blog/create-post', {
            creator:isAuthUser,
            title:title,
            categories:categories,
            content:content,
            image_link:firebaseImageLink,
            imageRefInFirebase: storageRefDb
          })
          .then(res=>{
              setStatus('success')
              setAlert(true)
              setTitle(' ');
              setCategories('');
              setContent('');
              setfirebaseImagedeployingStatus('')
              imageRef.current.value = ''
          })
          .catch(e=>{
              setStatus('error')
              setAlert(true)
          })
        }
    }


    
  return (
    <div className='container mt-4'>
        <span className='tag mb-4'>
            /Add Post
        </span>
        {status === 'error' && <SimpleAlert showAlert={alert} variants='danger'>Something went wrong</SimpleAlert>}
        {status === 'empty' && <SimpleAlert showAlert={alert} variants='warning'>Field cannot be empty</SimpleAlert>}
        {status === 'success' && <SimpleAlert showAlert={alert} variants='success'>Success</SimpleAlert>}

        <form className="row g-3 mt-2" onSubmit={handlePostSubmit}>
            <div className="col-md-6">
                <label htmlFor="post_title" className="form-label">Title</label>
                <input type="text" placeholder='Title' className="form-control" value={title} id="post_title" onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className="col-md-6">
                <label htmlFor="post_categories" className="form-label">Categories</label>
                <input type="text" className="form-control" value={categories} placeholder='sport, fashion, blog, education' id="post_categories" onChange={(e)=>setCategories(e.target.value)}/>
            </div>
            <div className="col-12">
                <label htmlFor="post_content" className="form-label">Content</label>
                <MDEditor value={content} onChange={setContent}/> 
            </div>

            <div className="col-md-4">
               {firebaseImagedeployingStatus ==='loading'? <AdvanceLoading>Image loading ...</AdvanceLoading>:''}

              {firebaseImagedeployingStatus==='error'? <div className="alert alert-danger" role="alert"> something went wrong</div>:''}
                

                <label htmlFor="post_image" className="form-label">Images</label>
                <input type="file" className="form-control" id="post_image" onChange={handleFileUpload} ref={imageRef}/>
            </div>

            <div className="col-sm-4" style={{ marginTop:'3rem' }}>
                <button type="submit" className="btn btn-primary" onClick={confirmUploadImage}>click to Confirm image</button>
            </div>

            <div className="col-md-4">
                <div className="form-check form-check-inline" style={{ marginTop:'2rem' }}>
                  <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" checked={firebaseImagedeployingStatus==='uploaded'} disabled/>
                  <label className="form-check-label" htmlFor="inlineCheckbox3">image confirmed</label>
                </div>
            </div>

            <div className="col-12">
                {status==='loading'?<AdvanceLoading/>:
                <button type="submit" className="btn btn-primary">Create post</button>}
            </div>
        </form>


    </div>
  )
}









