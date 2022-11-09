import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import {fileUpload} from  '../../utils/fileUpload';


export default function Setting() {
    const [content, setContent] = useState('');
    const [color, setColor] = useState('');
    const [file, setFile] = useState('');
    const [fileErrorMessage, setFileErrorMessage] = useState('');
    const [fileSuccessMessage, setFileSuccessMessage] = useState('');
    const [uploadedfileUrl, setUploadedfileUrl] = useState('');

    function handleFileChange(e){
        setFile(e.target.files[0]);
    }

    async function handleConfirmFileUpload(){
        console.log('click')
        try{
            const result = await fileUpload(file);
            console.log(result)
        }catch(error){
            console.log(error.message)
        }
       
    }

     console.log(file);

  return (
    <Container>
        <h4>Setting</h4>

            
                <Row sm={12} md={7} lg={8} xl={8} xxl={8} className='mb-4'>
                    <h6>Banner section</h6>
                    {/* <Form>  */}

                    <InputGroup>
                        <InputGroup.Text> Change Banner image</InputGroup.Text>
                            <Form.Control type='file' onChange={handleFileChange}/>
                            {/* <ProgressBar now={60} label={80} className='mt-2'/> */}
                            <Form.Check type='checkbox' id='' disabled label='status' className='ms-2'/>
                        <Button variant='primary' onClick={handleConfirmFileUpload}>Confirm</Button>
                    {/* </Form> */}
                    </InputGroup>  
                </Row>
                <Row className='mb-4'>
                    <Form.Group>
                        <Form.Label>Banner content</Form.Label>
                        {/* <Form.Control as='textarea'></Form.Control> */}
                        <MDEditor value={content} onChange={setContent}   previewOptions={{rehypePlugins: [[rehypeSanitize]]}}/>
                    </Form.Group>
                </Row>
   
               
                <Row sm={12} md={6} lg={6} xl={6}>
                    <h6>change background color section</h6>
                    <Form> 
                        <InputGroup>
                             <Form.Group>
                                <InputGroup.Text>Change background-color</InputGroup.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.Check type='switch' id='custom-switch'  style={{ marginLeft:'1rem' }}/>
                            </Form.Group>
                        </InputGroup>
                    </Form>
                </Row>
        
    </Container>
  )
}
