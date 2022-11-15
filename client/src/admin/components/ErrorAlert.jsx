import React, { useState, useEffect} from 'react';
import Alert from 'react-bootstrap/Alert';

export function ErrorAlert({alert, setAlert, children}) {
  const [show, setShow] = useState(true);

   useEffect(()=>{
    setShow(alert)
  }, [alert])



  if (show) {
    return (
      <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>{children}</p>
      </Alert>
    );
  }
  return <></>;
}

