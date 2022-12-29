import React from 'react'

export default function MyPostsTable({currentUserPosts, increasePage, isFetching, isPreviousData, currentPage, decreasePages}) {

    if(currentUserPosts <= 0){
        return(
            <div>No post yet</div>
        )
    }
    return (
    
        
    <div className='table-responsive'>
        <table className="table table-hover caption-top">
            <caption>List of posts</caption>
            <thead className='table-dark'>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Category</th>
                    <th scope="col">Content</th>
                    <th scope="col">Image</th>
                    <th scope="col">Edit post</th>
                    <th scope="col">Delete post</th>
                </tr>
            </thead>
            
            <tbody>
            {currentUserPosts.map((myPosts)=>(
            
                        <tr key={myPosts._id}>
                            <th scope="row">{myPosts._id.substr(0, 7)}</th>
                            <td>{myPosts.title}</td>
                            <td>{myPosts.category}</td>
                            <td>{myPosts.content}</td>
                            <td><img src={myPosts.image_link} alt='' loading='lazy' width='60rem' height='60rem' style={{objectFit:'cover'}}/></td>
                            <td><button className='btn btn-warning'>Edit</button></td>
                            <td><button className='btn btn-danger'>Delete</button></td>
                        </tr>
                        
                ))} 
             
            </tbody>
        </table>

        <span className='me-2'>Current Page: {currentPage + 1}</span>
        <button className='btn btn-primary me-2' onClick={() => decreasePages()} >Previous</button>

        <button className='btn btn-secondary' onClick={()=>increasePage()} >Next</button>
    </div>
  )
}
//disabled={currentUserPosts.length <= 5}
//disabled={currentPage===1}