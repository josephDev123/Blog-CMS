import React from 'react';
import button_styles from '../asset/css/css_modules/button-style.module.css';

export default function Users({ isLoading, data, error, isError, page, setPage, isFetching, isPreviousData}) {

  if(isLoading){
    return (
      <div className='container mt-4'>
          <button className="btn btn-primary me-2" type="button" disabled>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span className="visually-hidden">Loading...</span>
        </button>
        <button className="btn btn-primary" type="button" disabled>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>
      </div>
    )
  }

  if(isError){
    return <div className="alert alert-danger mt-4" role="alert"> {error.message} </div>
  }

  return (
    <div className='container mt-4 table-responsive'>
      {
      data?.map(users =>(
        <table key={users._id} className="table table-striped table-hover table-borderless caption-top">
           <caption>List of users profile</caption>
          <thead className='table-dark'>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Fullname</th>
              <th scope="col">Title</th>
              <th scope="col">About</th>
              <th scope="col">Phone</th>
              <th scope="col">username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{users._id.substr(0, 5)}</th>
              <td>{users.name}</td>
              <td>{users.title}</td>
              <td>{users.about.substr(0, 20)} ....</td>
              <td>{users.phone}</td>
              <td>{users.surname}</td>
            </tr>
          
          </tbody>
      </table>
        ))
      }

    <span>Current Page: {page}</span>
            <button className={button_styles.primaryColorBg}
              onClick={() => setPage(page => page - 1)}
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
              disabled={data.length <= 5}
            >
              Next Page
            </button>
            {isFetching ? <span className='alet alert-warning'> Loading...</span> : null}{' '}
            
    </div>
  )
}
