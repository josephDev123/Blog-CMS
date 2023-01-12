


export function EditMypostForm({data}){
   
    console.log(data);
    return (
        <form style={{marginTop:'2px', marginBottom:'2px'}}>
            <div className="mb-3" >
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" aria-describedby="emailHelp" defaultValue={data[0].title}/>
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <input type="text" className="form-control" id="category" defaultValue={data[0].category}/>
            </div>
            <div className="mb-3">
                <label htmlFor="content" className="form-label">Content</label>
                <textarea className="form-control" id="content" defaultValue={data[0].content}></textarea>
            </div>
            {/* <div className="mb-3">
                <label htmlFor="image" className="form-label">image</label>
                <input type="file" className="form-control" id="image"/>
            </div> */}
            {/* <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <input type="text" className="form-control" id="category"/>
            </div> */}

            <button type="submit" className="btn btn-primary">Edit post</button>
        </form>
    )
}