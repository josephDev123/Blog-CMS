import React from 'react'
import ActiveLink from '../../ActiveLink'

export default function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light">
    <div className="container">
      <a className="navbar-brand" href="/admin">Admin </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Admin</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
              {/* <a className="nav-link active" aria-current="page" href="/admin">Dashboard</a> */}
              <ActiveLink href='/admin' className="nav-link active" aria-current="page">
                    Dashboard
              </ActiveLink>
            </li>
            <li className="nav-item">
              {/* <a className="nav-link active" aria-current="page" href="/admin/create-post-form"></a> */}
              <ActiveLink href='/admin/create-post-form' className="nav-link" aria-current="page">
               Add Posts
              </ActiveLink>
            </li>
            <li className="nav-item">
              {/* <a className="nav-link active" aria-current="page" href="/admin/create-post-form"></a> */}
              <ActiveLink href='/admin/create-post-form' className="nav-link" aria-current="page">
               My Posts
              </ActiveLink>
            </li>
            <li className="nav-item">
              {/* <a className="nav-link" href="#">Users</a> */}
              <ActiveLink href='/admin/users-list' className="nav-link" aria-current="page">
              Users
              </ActiveLink>
            </li>
            <li className="nav-item">
              {/* <a className="nav-link" href="#">Users</a> */}
              <ActiveLink href='/admin/profile' className="nav-link" aria-current="page">
              profile
              </ActiveLink>
            </li>
            <li className="nav-item">
              {/* <a className="nav-link" href="#">Roles</a> */}
              <ActiveLink href='/admin/roles' className="nav-link" aria-current="page">
              Roles
              </ActiveLink>
            </li>
            <li className="nav-item">
              {/* <a className="nav-link" href="#">Statistic</a> */}
              <ActiveLink href='/admin/setting' className="nav-link" aria-current="page">
              Setting
              </ActiveLink>
            </li>

            <li className="nav-item">
              {/* <a className="nav-link" href="#">Statistic</a> */}
              <ActiveLink href='/' className="nav-link" aria-current="page">
              Home
              </ActiveLink>
            </li>
            <li className="nav-item">
              {/* <a className="nav-link" href="#">Logout</a> */}
              <ActiveLink href='/logout' className="nav-link" aria-current="page">
              Logout
              </ActiveLink>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
  </nav>
  )
}
