import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function ModalComponent({showModal, setShowModal, children, event}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShowModal(false);

useEffect(()=>{
    setShow(showModal)
}, [showModal])

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Grant user permission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/* {children} */}
     
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick = {event} variant="primary">Change</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

