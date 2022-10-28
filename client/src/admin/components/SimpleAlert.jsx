import React, { useState } from 'react';
import { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

export function SimpleAlert({showAlert, variants, children}) {
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState('');

  useEffect(()=>{
    setShow(showAlert)
    setVariant(variants)
  }, [showAlert, variants])


  if (show) {
    return (
      <Alert variant={variant} onClose={() => setShow(false)} dismissible>
        {/* <Alert.Heading>Oh snap! You got an error!</Alert.Heading> */}
        <p>
          {children}
        </p>
      </Alert>
    );
  }
  return <></>;
}
