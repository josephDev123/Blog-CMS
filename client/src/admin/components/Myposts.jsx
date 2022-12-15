import React from 'react'
import headingTag from '../asset/css/css_modules/page-heading.module.css'

export default function Myposts() {
  return (
    <div className='container mt-4'>
        <span className={headingTag.headingTag}>My posts</span>

        <section className='row mt-4'>
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4 col-sm-12">
                    <img src={process.env.PUBLIC_URL + '/images/blog-post-header3.jpg'} className="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div className="col-md-8 col-sm-12">
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        {/* <p classNameName="card-text"><small classNameName="text-muted">Last updated 3 mins ago</small></p> */}
                    </div>
                    </div>
                </div>
            </div>

        </section>
         
        
    </div>
  )
}
