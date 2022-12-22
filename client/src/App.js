
import './css/App.css';
import Layouts from './components/layouts';
import { Routes, Route } from "react-router-dom";
import IndexGalleryLayout from './components/pages/index_gallery_layout';
import { BrowserRouter } from "react-router-dom";
import {Blogs} from './components/pages/blogs';
import {PostByIdPage} from './components/pages/PostByIdPage';

//admin
import Layout from './admin/components/Layout';
import Dashboard from './admin/components/Dashboard';
import Post from './admin/components/Post';
import Profile from './admin/components/Profile';
import UsersList from './admin/components/UsersList';
import Roles from './admin/components/Roles';
import IsAdmin from './admin/components/authorization.js/isAdmin';
import Setting from './admin/components/Setting';
import Myposts from './admin/pages/Myposts'

import {AuthContext} from './Context/AuthContext'
import { useContext } from 'react';
import Login from './Login';
import Reqister from './Register';


function App() {

  const {isAuthUser} = useContext(AuthContext)
  console.log(isAuthUser)
  return (
       
          <div className="App">
             <BrowserRouter>
                <Routes>
                  
                    {/* client */}
                    <Route path='/' element={<Layouts/>}>
                      <Route index element={<IndexGalleryLayout/>}/>
                      <Route path='/blogs-post' element={<Blogs/>} />
                      <Route path='/blog/post/:id' element = {<PostByIdPage/>} />
                    </Route>
                    
                    {/* admin */}
                    <Route path='admin' element={<Layout/>}>
                      <Route index element={<Dashboard/>}/>
                      <Route path='/admin/create-post-form' element={<Post/>}/>
                      <Route path='/admin/profile' element={<Profile/>}/>
                      <Route path='/admin/users-list' element={<UsersList/>}/>
                      <Route path='/admin/roles' element={ <Roles/> }/>
                      <Route path='/admin/setting' element={ <Setting/> }/>
                      <Route path='/admin/my-post' element={ <Myposts/> }/>
                    </Route>
                    <Route path='/login' element= {<Login/>}/>
                    <Route path='/register' element= {<Reqister/>}/>
                </Routes>
              </BrowserRouter>
          </div>
  );
}

export default App;
