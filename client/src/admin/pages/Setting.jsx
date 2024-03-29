
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import { useState, useLayoutEffect } from 'react';
import {fileUpload} from  '../../utils/fileUpload';
import Loading from '../components/Loading';
import {ErrorAlert} from '../components/ErrorAlert';
import  axiosInstance  from '../../utils/axiosInstance';
import { SuccessAlert } from '../components/SuccessAlert';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import pageTitleStyle from  '../asset/css/css_modules/page-heading.module.css'
import btn_style from '../asset/css/css_modules/button-style.module.css'


export default function Setting() {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('');
    const [file, setFile] = useState('');
    const [alert, setAlert] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [SuccessUpload, setUploadSuccess] = useState(false);
    const [uploadedfileUrl, setUploadedfileUrl] = useState('');
    const[uploadProgress, setUploadProgress] = useState(null);
    const[status, setStatus] = useState('');


     const btn ={
        backgroundColor:'',
        color: ''
     }
    const {isAuthUser} = useContext(AuthContext)

    useLayoutEffect(()=>{
        document.title = 'Setting Page';
    }, [])

    function handleFileChange(e){
        setFile(e.target.files[0]);
    }

    //monitor file progress
    function handleProgress(state){
        setUploadProgress(state)
    }

    async function handlesubmitBannerAndContent(e){
          e.preventDefault();
        try {
            if(!uploadedfileUrl || !content || !title){
                setStatus('error')
                setAlert(true)
                setErrorMessage('FIELD(S) CANNOT BE EMPTY')
            }else{
                const postAndItContentReq = await axiosInstance({
                    method: 'post',
                    url: '/setting/change-banner-content',
                    data:{
                        creator:isAuthUser,
                        bannerSlug:uploadedfileUrl,
                        bannerContent:content,
                        title
                    }
                })
                if(postAndItContentReq.statusText === 'OK'){
                    const reqResultReturn = await postAndItContentReq.data
                    setAlert(true)
                    setStatus('success');
                    setSuccessMessage('Sent successfully');
                }
            }
        } catch (error) {
            setStatus('error')
            setAlert(true)
            setErrorMessage(error.message)
        }
    }

    async function handleConfirmFileUpload(){
        try{
            const result = await fileUpload(file, handleProgress);
           
            setUploadedfileUrl(result)
            setUploadProgress(null)
            setUploadSuccess(true)
        }catch(error){
            setErrorMessage(error.message)
            setAlert(true)
        }  
    }

  return (
    <Container className='mt-4'>
        <span className={pageTitleStyle.headingTag}>/Setting</span>
            {status==='error' && <ErrorAlert alert={alert} setAlert={setAlert}>{ErrorMessage}</ErrorAlert>}
            {status==='success' && <SuccessAlert alert={alert} setAlert={setAlert}>{successMessage}</SuccessAlert>}
            <Form onSubmit={handlesubmitBannerAndContent} className='mt-4'> 
                <Row sm={12} md={7} lg={8} xl={8} xxl={8} className='mb-4'>
                    <h6>Banner section</h6>

                    <Form.Group className='mb-4'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='text' onChange={(e)=>setTitle(e.target.value)}></Form.Control>
                    </Form.Group>

                    <InputGroup>
                        <InputGroup.Text> Change Banner image</InputGroup.Text>
                            <Form.Control type='file' onChange={handleFileChange}/>
                            <Form.Check type='checkbox' id='' disabled label='status' checked={SuccessUpload} className='mx-2'/>
                        <Button onClick={handleConfirmFileUpload}>Confirm</Button>
               
                    </InputGroup> 
                    
                     {/* loading component */}
                    {uploadProgress && <Loading> image uploading ... </Loading>} 
                
                    <Form.Group className='mt-4'>
                        <Form.Label>Banner content</Form.Label>
                        <MDEditor value={content} onChange={setContent}   previewOptions={{rehypePlugins: [[rehypeSanitize]]}}/>
                    </Form.Group>

                </Row>
                <Button variant='primary mb-4' type='submit'>Change banner/content</Button>
            </Form>
            <hr />
               
                <Row sm={12} md={6} lg={6} xl={6}>
                    <h6>background color section</h6>
                   
                        <InputGroup>
                             <Form.Group>
                                <InputGroup.Text>Change background-color</InputGroup.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.Check type='switch' id='custom-switch'  style={{ marginLeft:'1rem' }}/>
                            </Form.Group>
                        </InputGroup>
                    
                </Row>
                
        
    </Container>
  )
}
