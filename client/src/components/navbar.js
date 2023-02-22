import React from 'react'
import '../css/navbar.css'
import ActiveLink from '../ActiveLink'

export default function Navbar(){
  return (
     
    <nav className="navbar fixed-top navbar-expand-md navbar-light bg-light">
        <div className="container">
             <ActiveLink href='/' className="navbar-brand">
                Blog CMS
            </ActiveLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {/* <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Home page</a>
                    </li> */}
                  
                </ul>

                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <ActiveLink href='/' className="nav-link">
                        Home
                    </ActiveLink>
                    </li>
                    <li className="nav-item">
                    <ActiveLink href='/about-us' className="nav-link">
                        About us
                    </ActiveLink>
                    </li>
                    <li className="nav-item">
                    <ActiveLink href='/blogs-post' className="nav-link">
                        Blog
                    </ActiveLink>
                    </li>
                     <li className="nav-item">
                    <ActiveLink href='/admin' className="nav-link">
                        Admin
                    </ActiveLink>
                    </li>
                    <li>
                    <ActiveLink href='/login' className="nav-link">
                        Login
                    </ActiveLink>
                    </li>
                    <li>
                    <ActiveLink href='/register' className="nav-link">
                        Register
                    </ActiveLink>
                    </li>
                </ul>
                <div className="d-flex">
                     <a href='https://www.linkedin.com/in/joseph-uzuegbu/' className='btn btn-white'><i className="fa-brands fa-linkedin-in"></i></a>
                     <a href='https://twitter.com/JosephUzuegbu' className='btn btn-white'><i className="fa-brands fa-twitter"></i></a>
                     <a href='https://github.com/josephDev123' className='btn btn-white'><i className="fa-brands fa-github"></i></a>
                </div>
            </div>
        </div>
</nav>
  )
}
