import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';



export default function Setting() {
  return (
    <Container>
        <h5>Setting</h5>

            
                <Row sm={12} md={7} lg={8} xl={8} xxl={8} className='mb-4'>
                    <h6>Banner section</h6>
                    {/* <Form>  */}
                        <Form.Group>
                            <Form.Label>Change Banner image</Form.Label>
                            <Form.Control type='file' />
                        </Form.Group>
                    {/* </Form> */}
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
