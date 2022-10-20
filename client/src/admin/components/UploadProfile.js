import React from 'react'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {Alerts} from './Alert';


export function UploadProfile({trigger, showModal, setShowModal}) {

    const [names, setName] = useState('');
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
    const [phone, setPhone] = useState('');
    const [surname, setSurname] = useState('');
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState(false);
    const [variant, setVariant] = useState('');


    const {isAuthUser} = useContext(AuthContext);

    const handleClose = () => {
      setShow(false);
      setShowModal(false)
    }


    useEffect(()=>{
      setShow(showModal)
    }, [showModal]);

// console.log(show);

   async function handleSubmitProfile(e){
    e.preventDefault();
//handle the profile data request
    try{
      const profile = await axios({
        method:'post',
        url:'http://localhost:7000/profile/upload-profile',
        data:{
            isAuthUser,
            names,
            title,
            about,
            phone,
            surname
        }
    })
       const res = await profile.data;
        if(res.success){
          e.target.reset();
          setVariant('success');
          setAlert(true)
          trigger('enactRender')
        }else{
          setVariant('danger');
          setAlert(true)
        }

    }catch(error){
      console.log(error.message)
      setVariant('danger');
      setAlert(true)
    }
      
   }


  return (
    <>
    <Modal show={show} onHide={handleClose} backdrop='static' keyboard='false'>
      <Modal.Header closeButton>
        <Modal.Title>upload profile</Modal.Title>
      </Modal.Header>
        <Modal.Body>
        {/* alert component */}
        <Alerts variant={variant} showAlert={alert} setShowAlert={setAlert} setVariant = {setVariant}/>

            <Form onSubmit={handleSubmitProfile}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor='name'>names:</Form.Label>
                  <Form.Control type="text" id="name" onChange={(e)=>setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor='title-name'>title:</Form.Label>
                  <Form.Control type="text" id="title-name" onChange={(e)=>setTitle(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="about">About: </Form.Label>
                  <Form.Control as="textarea" rows={3} id="about" onChange={(e)=>setAbout(e.target.value)} />
                </Form.Group> 
                
                <Form.Group className="mb-3" >
                  <Form.Label htmlFor="phone">phone:</Form.Label>
                  <Form.Control type="phone" id="phone" onChange={(e)=>setPhone(e.target.value)}/>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="user-name">username:</Form.Label>
                  <Form.Control type="text" id="user-name" onChange={(e)=>setSurname(e.target.value)}/>
                </Form.Group>
                
                <Button variant="primary" type="submit">
                  Submit
                </Button>
            </Form>

        </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  </>

  )
}
