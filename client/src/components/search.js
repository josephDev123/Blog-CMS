import React from 'react';
import {Link} from 'react-router-dom';
import {useState, useRef} from 'react';


export default function Search({setcategory, isLoading, isError, error, data}) {

    const categoryBtn = useRef()
     function handleChangeCategory(e){
        setcategory(e.target.textContent);
        //ahange the button title when the categories button is click
        categoryBtn.current.innerHTML = e.target.textContent;
     }

    // console.log(data);
  return (
        <div className="dropdown">
            <button ref ={categoryBtn} className="btn btn-sm btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {isLoading?<li><div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        </div></li>:isError?<li>{error.message}</li>:data.length=== 0?<li>no data yet</li>:data.map(categories=><li key={categories._id} onClick={handleChangeCategory}><Link className="dropdown-item" to="#">{categories.category}</Link></li>)}
            </ul> 
        </div>
  )
}
