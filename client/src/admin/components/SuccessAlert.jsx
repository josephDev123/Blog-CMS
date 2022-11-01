import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

export function SuccessAlert({alert,status}) {
  const [show, setShow] = useState(true);

   useEffect(()=>{
    setShow(alert)
    // setVariant(variants)
  }, [alert, status])

  console.log(alert, status)



  if (show) {
    return (
      <Alert variant="success" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Success!</Alert.Heading>
        <p>
        </p>
      </Alert>
    );
  }
  return <></>;
}

