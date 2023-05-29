import React from 'react';
import './css/loginRegister.css';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
import { app } from './firebase/firebaseAuth';
import { AuthContext } from './Context/AuthContext';


export default function Reqister() {
    const [email, setEmail]= useState('');
    const [password, setPassword] =useState('');
    const [status, setStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    
    const {login} = useContext(AuthContext);

    const auth = getAuth();
    //register users
    function handlesubmit(e){;
        e.preventDefault();
        if (!email || !password) {
            setStatus('empty');
        }else{
            createUserWithEmailAndPassword(auth, email, password).then(user=>{
                if(user.user.uid){
                    setStatus('registered');
                    login(user.user.email)
                    return navigate('/admin');
                   
                }
            }).catch(err=> {
                setStatus('error')
                setErrorMessage(err.code)
            })
        }
    }

  return (
    <div className='container form_wrapper'>
       <Link to='/'><i className="fa-solid fa-arrow-left"></i></Link>
        <form onSubmit={handlesubmit} className='register-form'> 
        <h3>Register</h3>
        {status === 'empty' &&  <div className="alert alert-danger" role="alert">Field(s) cannot be empty!</div>}
        {status === 'registered' &&  <div className="alert alert-success" role="alert">Registration successful !</div>}
        {status === 'error' &&  <div className="alert alert-danger" role="alert">{errorMessage}!</div>}

            <div className="mb-3">
                <label htmlFor="InputEmail" className="form-label">Email address</label>
                <input type="email" className="form-control" id="InputEmail" autoComplete='off' aria-describedby="emailHelp" onChange={(e)=>setEmail(e.target.value)}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="InputPassword1" className="form-label">Password</label>
                <input type="password" autoComplete='off' className="form-control" id="InputPassword1" onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="input-group mb-3">
                <button type='submit' className="btn btn-primary">Register</button>
                <Link to='/login' className="btn btn-outline-secondary" type="button">haven't login</Link>
            </div>
        </form>
    </div>
  )
}
