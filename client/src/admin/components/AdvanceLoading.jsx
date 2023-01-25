export function AdvanceLoading(){
    return (
        <div className='mt-4'>
            <button className="btn btn-primary me-2" type="button" disabled>
            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            <span className="visually-hidden">Loading...</span>
            </button>
            <button className="btn btn-primary" type="button" disabled>
            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            Loading...
            </button>
        </div>
    )
}