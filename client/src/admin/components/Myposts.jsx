import React from 'react'
import headingTag from '../asset/css/css_modules/page-heading.module.css'

export default function Myposts() {
    const styleBanner = {
        objectFit:'cover',
        objectPosition:'center'
    }

  return (
    <div className='container mt-4'>
        <span className={headingTag.headingTag}>My posts</span>

        <section className='row mt-4'>
            <div className="card mb-3 ps-0">
                <div className="row g-0">
                    <div className="col-md-4 col-sm-12">
                    <img src={process.env.PUBLIC_URL + '/images/blog-post-header3.jpg'} className="img-fluid rounded-start border h-100 w-100" alt="..." style={styleBanner}/>
                    </div>
                    <div className="col-md-8 col-sm-12">
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <figure class="text-center">
                                <blockquote class="blockquote">
                                    <p>The first thing you learn when you’re blogging is that people are one click away from leaving you. So you’ve got to get to the point, you can’t waste people’s time, you’ve got to give them some value for their limited attention span. </p>
                                </blockquote>
                                <figcaption class="blockquote-footer">
                                    ~Alex Tabarrok
                                </figcaption>
                            </figure>
                        </div>
                        <div className="card-body">
                        <figure class="text-center">
                            <blockquote class="blockquote">
                                <p>Every time you post something online, you have a choice. You can either make it something that adds to the happiness levels in the world—or you can make it something that takes away.</p>
                            </blockquote>
                            <figcaption class="blockquote-footer">
                                ~Zoe Sugg
                            </figcaption>
                        </figure>
                        </div>
                    </div>
                </div>
            </div>

        </section>
         
        
    </div>
  )
}
