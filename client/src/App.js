
import './css/App.css';
import Layouts from './components/layouts';
import { Routes, Route } from "react-router-dom";
import LandingPage from './components/pages/LandingPage';
import { BrowserRouter } from "react-router-dom";
import {Blogs} from './components/pages/blogs';
import {PostByIdPage} from './components/pages/PostByIdPage';

//admin
import Layout from './admin/components/Layout';
import Dashboard from './admin/pages/Dashboard';
import AddPost from './admin/pages/AddPost';
import Profile from './admin/pages/Profile';
import UsersList from './admin/pages/UsersList';
import Roles from './admin/pages/Roles';
import IsAdmin from './admin/components/authorization.js/isAdmin';
import Setting from './admin/pages/Setting';
import Myposts from './admin/pages/Myposts'

import {AuthContext} from './Context/AuthContext'
import { useContext } from 'react';
import Login from './Login';
import Reqister from './Register';
import ProtectedRoute from './ProtectedRoute';


function App() {

  const {isAuthUser} = useContext(AuthContext)
  console.log(isAuthUser)
  return (
       
          <div className="App">
             <BrowserRouter>
                <Routes>
                  
                    {/* client */}
                    <Route path='/' element={<Layouts/>}>
                      <Route index element={<LandingPage/>}/>
                      <Route path='/blogs-post' element={<Blogs/>} />
                      <Route path='/blog/post/:id' element = {<PostByIdPage/>} />
                    </Route>
                    
                    {/* admin */}
                    <Route path='admin' element={<Layout/>}>
                      <Route index element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
                      <Route path='/admin/create-post-form' element={<ProtectedRoute><AddPost/></ProtectedRoute>}/>
                      <Route path='/admin/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                      <Route path='/admin/users-list' element={<ProtectedRoute><UsersList/></ProtectedRoute>}/>
                      <Route path='/admin/roles' element={ <ProtectedRoute><Roles/></ProtectedRoute> }/>
                      <Route path='/admin/setting' element={ <ProtectedRoute><Setting/></ProtectedRoute> }/>
                      <Route path='/admin/my-post' element={ <ProtectedRoute><Myposts/> </ProtectedRoute>}/>
                      <Route path='/admin/my-post/:id' element={ <ProtectedRoute><Myposts/> </ProtectedRoute>}/>
                    </Route>
                    <Route path='/login' element= {<Login/>}/>
                    <Route path='/register' element= {<Reqister/>}/>
                </Routes>
              </BrowserRouter>
          </div>
  );
}

export default App;
