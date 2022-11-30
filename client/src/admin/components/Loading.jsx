import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function Loading({children}) {
  return (
    <>

      <Button variant="warning" disabled size='sm' className='mt-2'>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        {children}
      </Button>
    </>
  );
}

export default Loading;