import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
// import Button from 'react-bootstrap/Button';

export function Alerts({variant, showAlert, setShowAlert, setVariant}) {

  function HandleCloseAlert(){
    setShowAlert(false);
    setVariant(' ')
  }


  if (showAlert) {
    return (
      <Alert variant={variant} onClose={HandleCloseAlert} dismissible>
        <Alert.Heading> { variant==='danger' ? "Oh snap! You got an error!": "profile upload successfully"}</Alert.Heading>
      </Alert>
    );
  }
  return <></>;
}

   