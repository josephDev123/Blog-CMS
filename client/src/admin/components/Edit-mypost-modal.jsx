import {EditMypostForm} from './Edit-mypost-form';
import {useReqHttp} from '../../customHooks/useReqHttp';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export function EditMyPostModal({id, setquerykey}){

    // close edit my post modal
    function handleCloseModal(){
        setquerykey(uuidv4());
        return location('/admin/my-post');
    }

    const location = useNavigate();
   
    const { isLoading, isError, error, data} = useReqHttp('blog/post/byId', '', id, '', false);
    
    return(
        <>

       {/* Modal  */}
        <div className="modal fade" id="editMyPostModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{ data && data[0]?.title.substr(0, 10) +'...'}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body">
                {isLoading && <Loading> Loading ...</Loading>}
                {isError && <div className='alert alert-danger'>{error.message} {' '} <span><button onClick={()=>location('/admin/my-post')}>Try again </button></span></div>}
                {data && <EditMypostForm data={data} />}
            </div>
            {/* <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div> */}
            </div>
        </div>
        </div>
        </>
    )
}