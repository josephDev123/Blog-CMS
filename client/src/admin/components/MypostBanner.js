import React from 'react'

export default function MypostBanner() {

    const styleBanner = {
        objectFit:'cover',
        objectPosition:'center'
    }
  return (
    
    <section className='row mt-4'>
    <div className="card mb-3 ps-0">
        <div className="row g-0">
            <div className="col-md-4 col-sm-12">
            <img src={process.env.PUBLIC_URL + '/images/blog-post-header3.jpg'} className="img-fluid rounded-start border h-100 w-100" alt="..." style={styleBanner}/>
            </div>
            <div className="col-md-8 col-sm-12">
                <div className="card-body">
                    <h5 className="card-title">Blog Quotes</h5>
                    <figure className="text-center">
                        <blockquote className="blockquote">
                            <p>The first thing you learn when you’re blogging is that people are one click away from leaving you. So you’ve got to get to the point, you can’t waste people’s time, you’ve got to give them some value for their limited attention span. </p>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                            ~Alex Tabarrok
                        </figcaption>
                    </figure>
                </div>
                <div className="card-body d-none d-sm-block d-sm-none d-md-block">
                <figure className="text-center">
                    <blockquote className="blockquote">
                        <p>Every time you post something online, you have a choice. You can either make it something that adds to the happiness levels in the world—or you can make it something that takes away.</p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                        ~Zoe Sugg
                    </figcaption>
                </figure>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}
