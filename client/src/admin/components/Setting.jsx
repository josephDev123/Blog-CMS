import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import { useState } from 'react';
import {fileUpload} from  '../../utils/fileUpload';
import Loading from './Loading';
import {ErrorAlert} from './ErrorAlert';


export default function Setting() {
    const [content, setContent] = useState('');
    const [color, setColor] = useState('');
    const [file, setFile] = useState('');
    const [alert, setAlert] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState('');
    const [SuccessUpload, setUploadSuccess] = useState(false);
    const [uploadedfileUrl, setUploadedfileUrl] = useState('');
    const[uploadProgress, setUploadProgress] = useState(null);

    function handleFileChange(e){
        setFile(e.target.files[0]);
    }

    function handleProgress(state){
        setUploadProgress(state)
    }

    async function handleConfirmFileUpload(){
        
        try{
            const result = await fileUpload(file, handleProgress);
           
            setUploadedfileUrl(result)
            setUploadProgress(null)
            setUploadSuccess(true)
            console.log(result)
        }catch(error){
            setErrorMessage(error.message)
            setAlert(true)
            console.log(error.message)
        }
       
    }

      console.log(uploadProgress);
      console.log(ErrorMessage);
      console.log(uploadedfileUrl);
      console.log(SuccessUpload);
  return (
    <Container>
        <h4>Setting</h4>
            <ErrorAlert alert={alert} setAlert={setAlert}>{ErrorMessage}</ErrorAlert>
            <Form> 
                <Row sm={12} md={7} lg={8} xl={8} xxl={8} className='mb-4'>
                    <h6>Banner section</h6>

                    <InputGroup>
                        <InputGroup.Text> Change Banner image</InputGroup.Text>
                            <Form.Control type='file' onChange={handleFileChange}/>
                            {/* <ProgressBar now={60} label={80} className='mt-2'/> */}
                            <Form.Check type='checkbox' id='' disabled label='status' defaultChecked={SuccessUpload} className='mx-2'/>
                        <Button variant='primary' onClick={handleConfirmFileUpload}>Confirm</Button>
               
                    </InputGroup> 
                     {/* loading component */}
                    {uploadProgress && <Loading> image uploading ... </Loading>} 
                </Row>
                <Row className='mb-4'>
                    <Form.Group>
                        <Form.Label>Banner content</Form.Label>
                        {/* <Form.Control as='textarea'></Form.Control> */}
                        <MDEditor value={content} onChange={setContent}   previewOptions={{rehypePlugins: [[rehypeSanitize]]}}/>
                    </Form.Group>
                </Row>
            </Form>
               
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
