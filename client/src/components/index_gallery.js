import {react, useState} from 'react';
import '../css/indexGallery.css';
import {Link} from 'react-router-dom';

export default function IndexGallery({isLoading, isError, error, data}){

    if(isLoading) {
        return(
            <>
                <button className="btn btn-primary" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span className="visually-hidden">Loading...</span>
                </button>
                <button className="btn btn-primary" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
                </button>
            </>
        )
    }

    if(isError){
        return (
                <div className="alert alert-danger" role="alert">
                {error.message}
                </div>
        )
    }

    return(
            <section className='index_gallery_parent'>
                    {data.map((posts)=>(
                    <div key={posts._id} className='index_content mb-4'>
                        <img src={posts.image_link} alt='img' className='indexGallery_img' width='100%' />
                        <h3>{posts.title}</h3>
                        <p>{posts.content.substring(0, 50)}...</p>
                        <Link to={'blog/post/'+posts._id}>read more</Link>
                    </div>
                    ))}
            </section>
           
    )
}