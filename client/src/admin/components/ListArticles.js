import React from 'react';
import { useContext, useState } from 'react';
import '../asset/css/listArticles.css';
// import PostListInTable from './PostListInTable';
import { useQuery } from 'react-query';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';


export default function ListArticles() {
  const [page, setPage] = useState(1);

  const {isAuthUser} = useContext(AuthContext);

  const {isLoading, isError, data, error, isFetching, isPreviousData } = useQuery(['posts', page], async ()=>{

      try {
                  const post = await axios({
                    // url:`http://localhost:7000/blog/all-post-pagination/${page}`,
                    url:`http://localhost:7000/blog/all-post-pagination?page=${page}`,
                    method:'get'
                  })
            
                const result =  await post.data;
                  return result;
            
                } catch (error) {
                 return error.messsage;
                }
            


  }, { keepPreviousData : true });

  console.log(data);
  //loading
 if(isLoading) return (
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

  //error
  if(isError) return <div className="alert alert-danger mt-4" role="alert">{error.message}</div>



// if(!data.length ) return <div className="alert alert-primary mt-4" role="alert">No Articles</div>

  //success
    return (
    <div className='mt-4  list_article_container container'>
        <h3 className='pt-2'>Articles</h3>

        <div className="table-responsive">
            <table className="table table table-striped table-hover table-bordered">
            <caption>List of Blogs</caption>
              <thead className='table-dark'>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Creator</th>
                  <th scope="col">Content</th>
                  <th scope="col">Category</th>
                  <th scope="col">image</th>
                </tr>
              </thead>
              <tbody>

                {data.map(item =>(
                  
                  <tr key={item._id}>
                    <th scope="row">{item._id.substring(0, 5)}</th>
                    <td>{item.title}</td>
                    <td>{item.creator}</td>
                    <td>{item.content}</td>
                    <td>{item.category}</td>
                    <td><img src={item.image_link} className="img-fluid rounded float-end" height='100rem' width='100rem' alt="blog_image"/></td>
                </tr>
                  ))
                }
               
              </tbody>
            </table>
        </div>

              <span>Current Page: {page}</span>
            <button className='btn btn-primary'
              onClick={() => setPage(old => old - 1)}
              disabled={page === 1}
            >
              Previous Page
            </button>{' '}
            <button className='btn btn-secondary'
              onClick={() => {
                // if (!isPreviousData && data.hasMore) {
                  setPage(old => old + 1)
                // }
              }}
              // Disable the Next Page button until we know a next page is available
              disabled={data.length <= 2}
            >
              Next Page
            </button>
            {isFetching ? <span className='alet alert-warning'> Loading...</span> : null}{' '}
            
    </div>
  )


}
