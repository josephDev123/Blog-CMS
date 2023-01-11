import {EditMypostForm} from './Edit-mypost-form';
import {useReqHttp} from '../../customHooks/useReqHttp';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';

export function EditMyPostModal({id}){

    // close edit my post modal
    function handleCloseModal(){
        return location('/admin/my-post')
    }

    const location = useNavigate();
    console.log(id);
    const { isLoading, isError, error, data, isFetching, isPreviousData} = useReqHttp('blog/post/byId', '', id, '', false)
    
    return(
        <>

       {/* Modal  */}
        <div className="modal fade" id="editMyPostModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body">
                {isLoading && <Loading/>}
                {isError && <div className='alert alert-danger'>{error.message} {' '} <span><button onClick={()=>location('/admin/my-post')}>Try again </button></span></div>}
                {data && <EditMypostForm data={data}/>}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>
        </>
    )
}