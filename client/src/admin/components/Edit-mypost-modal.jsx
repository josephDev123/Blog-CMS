

export function EditMyPostModal(){
    
    return(
        <>
    {/* Button trigger modal  */}
        {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editMyPostModal">
        Launch demo modal
        </button> */}

       {/* Modal  */}
        <div className="modal fade" id="editMyPostModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                ...
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>
        </>
    )
}