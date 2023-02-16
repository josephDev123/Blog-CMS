import React, { useState, useEffect } from 'react';
// import { Outlet } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

export function SuccessAlert({alert, setAlert, children}) {
  const [show, setShow] = useState(true);

   useEffect(()=>{
    setShow(alert)
  }, [alert ])

  console.log(alert)



  if (show) {
    return (
      <Alert variant="success" onClose={() => setAlert(false)} dismissible>
        <Alert.Heading>Success!</Alert.Heading>
        <p>
           {children}
        </p>
      </Alert>
    );
  }
  return <></>;
}

