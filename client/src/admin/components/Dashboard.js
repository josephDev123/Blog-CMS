import React from 'react';
import '../asset/css/dashboard.css';
import ListArticles from './ListArticles';
import ActiveLink from '../../ActiveLink';
import { useContext } from 'react';
import {AuthContext} from '../../Context/AuthContext'

export default function Dashboard() {
    const {isAuthUser} = useContext(AuthContext)
    console.log(isAuthUser)
  return (
    <div className='container mt-4'>
        <span className='tag'>
            /Dashboard
        </span>
        <section className='heading_box'>
            <div className='heading_content' >
                <div>
                    <h2>Hello Developer</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <ActiveLink href='/admin/create-post-form' className='write_post'>Write new Post</ActiveLink>
                </div>
            </div>

            <div className='heading_img'>
                <img src='/admin/asset/images/undraw_Add_notes.png' alt='' className='img'/>
            </div>
        </section>
        <ListArticles/>
    </div>
  )
}
