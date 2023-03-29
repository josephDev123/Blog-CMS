import React from 'react';
import { useContext, useState } from 'react';
import '../asset/css/listArticles.css';
import { AuthContext } from '../../Context/AuthContext';
import {AdvanceLoading} from './AdvanceLoading'
import {Link} from 'react-router-dom';
import {useReqHttp} from '../../customHooks/useReqHttp'


export default function ListArticles() {
  const [page, setPage] = useState(1);

  const {isAuthUser} = useContext(AuthContext);

  const {isLoading, isError, error, data, isFetching, isPreviousData } = useReqHttp('blog/all-post-pagination', '', page, 'posts', '', true)


 if(isLoading) return (
      <AdvanceLoading/>
  ) 

  //error
  if(isError) return <div className="alert alert-danger mt-4" role="alert">{error.message}</div>



if(data.length === 0) return <div className="alert alert-primary mt-4" role="alert">No Articles</div>

  //success
    return (
        <div className='mt-4 list_article_container'>
            <h3 className='pt-2'>Articles</h3>

            <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered">
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
                        <td><Link to={'/blog/post/'+item._id}>{item.title}</Link></td>
                        <td>{item.creator}</td>
                        <td>{item.content.length <= 50 ? item.content : item.content.substring(0, 50)+'.....'}</td>
                        <td>{item.category}</td>
                        <td><img src={item.image_link} className="img-fluid rounded" height='50rem' width='50rem' alt="blog_image"/></td>
                    </tr>
                      ))
                    }
                  
                  </tbody>
                </table>
            </div>

             <span>Current Page: {page}</span>
                <button className='btn border border-none' style={{backgroundColor:'var(--admin-primary)', color:'var(--admin-secondary)'}}
                  onClick={() => setPage(old => old - 1)}
                  disabled={page === 1}
                >
                  Previous Page
                </button>{' '}
                <button className='btn'
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
