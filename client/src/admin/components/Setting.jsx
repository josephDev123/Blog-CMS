import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import { useState } from 'react';



export default function Setting() {
    const [content, setContent] = useState('');
    const [color, setColor] = useState('');
    

  return (
    <Container>
        <h4>Setting</h4>

            
                <Row sm={12} md={7} lg={8} xl={8} xxl={8} className='mb-4'>
                    <h6>Banner section</h6>
                    {/* <Form>  */}
                        <Form.Group>
                            <Form.Label>Change Banner image</Form.Label>
                            <Form.Control type='file' />
                        </Form.Group>
                    {/* </Form> */}
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
