import React from 'react'
import { useState } from 'react';
import  axiosInstance from '../../utils/axiosInstance'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Alerts} from './Alert';

export default function EditProfile({profile, show, setShow, trigger}) {

    const [names, setName] = useState('');
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
    const [phone, setPhone] = useState('');
    const [surname, setSurname] = useState('');
    const [variant, setVariant] = useState('');
    const [alert, setAlert] = useState(false);


   async function  handleSubmitEditProfile(e){
    e.preventDefault();
    try{
        //handle the profile data request
        const userprofileResp = await axiosInstance({
            method:'post',
            url:`/profile/edit-profile/${profile._id}`,
            data:{
                profile,
                names,
                title,
                about,
                phone,
                surname
            }
        })
        const resultResponse = await userprofileResp.data;
        console.log(resultResponse)
        if(resultResponse.success==='profile updated'){
          setAlert(true);
          setVariant('success')
          trigger((initial)=>!initial)
          console.log('edited');
        }
        
        }catch(e){
          console.log(e.message);
          setAlert(true);
        setVariant('danger')
        }
   }


   //close modal
   const handleClose = () => {
    setShow(false);
    setAlert(false);
    trigger(true)
  }


  return (
    <>
    <Modal show={show} onHide={handleClose} backdrop='static' keyboard='false'>
      <Modal.Header closeButton>
        <Modal.Title>Edit  profile</Modal.Title>
      </Modal.Header>
        <Modal.Body>
        {/* alert component */}
         <Alerts variant={variant} showAlert={alert} setShowAlert={setAlert} setVariant = {setVariant}/> 

            <Form onSubmit={handleSubmitEditProfile}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor='name'>names:</Form.Label>
                  <Form.Control type="text" id="name" defaultValue={profile.name} onChange={(e)=>setName(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor='title-name'>title:</Form.Label>
                  <Form.Control type="text" id="title-name" defaultValue={profile.title} onChange={(e)=>setTitle(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="about">About: </Form.Label>
                  <Form.Control as="textarea" rows={3} id="message-text" defaultValue={profile.about} onChange={(e)=>setAbout(e.target.value)} />
                </Form.Group> 
                
                <Form.Group className="mb-3" >
                  <Form.Label htmlFor="phone">phone:</Form.Label>
                  <Form.Control type="phone" id="phone" defaultValue={profile.phone} onChange={(e)=>setPhone(e.target.value)}/>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="user-name">username:</Form.Label>
                  <Form.Control type="text" id="user-name" defaultValue={profile.surname} onChange={(e)=>setSurname(e.target.value)}/>
                </Form.Group>
                
                <Button variant="primary" type="submit">
                edit profile
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
