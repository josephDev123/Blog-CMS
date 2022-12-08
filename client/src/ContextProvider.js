import React from 'react';
import { useState, useEffect } from 'react';
import { AuthContext } from './Context/AuthContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { useNavigate, Link, Navigate} from 'react-router-dom';

export function ContextProvider({children}) {
    const [isAuthUser, setIsAuthUser] = useState('')
    const [isAuth, setIsAuth] = useState('loading');
    // const redirect = useNavigate();
console.log(isAuthUser);
// console.log(isAuth);

const auth = getAuth();

//check authentication status
useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
        if(user){
            setIsAuth('fulfilled') 
            setIsAuthUser(user.email);
        }else{
            setIsAuth('network') 
            setIsAuthUser('');
        }

    } )
}, [auth])

    const login = (user) =>{
        if(user === null || user === undefined){
            setIsAuth('network') 
            setIsAuthUser('');
        }else{
            setIsAuth('fulfilled') 
            setIsAuthUser(user);
            // clearTimeout(id)
        }
    }

    const signOut = ()=>{

    }

    // if the loading takes longer time maybe because of unauthenticated user or network
//    const id = setTimeout(() => {
//         setIsAuth('network');
//         document.cookie = 'name=no register';
//     }, 10000);

    
    if(isAuth === 'loading'){
            return (
                <div className="text-center mt-4">
                    <button className="btn btn-primary me-2" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span className="visually-hidden">Loading...</span>
                    </button>
                    <button className="btn btn-primary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                    </button>
                </div>
            )
    }

        if (isAuth === 'fulfilled' || isAuth === 'network') {
            return (
                <div>
                    <AuthContext.Provider value={{ login, signOut, isAuthUser }}>
                        {children}
                    </AuthContext.Provider>  
                </div>
            )
        }
  
}
