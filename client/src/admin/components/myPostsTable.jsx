import React from 'react'

export default function MyPostsTable({currentUserPosts}) {

    if(currentUserPosts <= 0){
        return(
            <div>No post yet</div>
        )
    }
    return (
    
        
    <div className='table-responsive'>
        <table className="table table-hover caption-top">
            <caption>List of posts</caption>
            <thead>
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
            //  <fragment > 
                        <tr key={myPosts._id}>
                            <th scope="row">{myPosts._id.substr(0, 7)}</th>
                            <td>{myPosts.title}</td>
                            <td>{myPosts.category}</td>
                            <td>{myPosts.content}</td>
                            <td><img src={myPosts.image_link} alt='' loading='lazy' width='20rem' height='20rem'/></td>
                            <td><button className='btn btn-warning'>Edit post</button></td>
                            <td><button className='btn btn-danger'>Delete post</button></td>
                        </tr>
                        // </fragment>
                ))} 
             
            </tbody>
           
        </table>
    </div>
  )
}
