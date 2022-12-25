import React from 'react'

export default function MyPostsTable({currentUserPosts}) {
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
                    <div key={myPosts._id}>
                        <tr>
                            <th scope="row">{myPosts._id}</th>
                            <td>{myPosts.title}</td>
                            <td>{myPosts.category}</td>
                            <td>{myPosts.content}</td>
                            <td>{myPosts.image_link}</td>
                            <td><button className='btn btn-warning'>Edit post</button></td>
                            <td><button className='btn btn-danger'>Delete post</button></td>
                        </tr>

                    </div>
                ))}
           
            {/* <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
            </tr> */}
            </tbody>
        </table>
    </div>
    
  )
}
