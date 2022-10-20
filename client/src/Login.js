import React from 'react'
import './css/loginRegister.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {signInWithEmailAndPassword, getAuth} from 'firebase/auth'
import { app } from './firebase/firebaseAuth';


export default function Login() {
    const [email, setEmail]= useState('');
    const [password, setPassword] =useState('');
    const [status, setStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const auth = getAuth();

        //login users
        function handleSubmitLogin(e){;
            e.preventDefault();
            if (!email || !password) {
                setStatus('empty');
            }else{
                signInWithEmailAndPassword(auth, email, password).then(user=>{
                    if(user.user.uid){
                        setStatus('registered');
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
        <form onSubmit={handleSubmitLogin}>
            <h3>Login</h3>

            {status === 'empty' &&  <div className="alert alert-danger" role="alert">Field(s) cannot be empty!</div>}
            {status === 'registered' &&  <div className="alert alert-success" role="alert">Registration successful !</div>}
            {status === 'error' &&  <div className="alert alert-danger" role="alert">{errorMessage}!</div>}

            <div className="mb-3">
                <label htmlFor="InputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="InputEmail1" aria-describedby="emailHelp" onChange={(e)=>setEmail(e.target.value)}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="InputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="InputPassword1" onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            
            <div className="input-group mb-3">
                <button className="btn btn-primary" type="submit">Login</button>
                <a href='/register' className="btn btn-outline-secondary" type="button">haven't register</a>
            </div>
        </form>
    </div>
  )
}
