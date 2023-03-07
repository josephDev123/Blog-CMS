import {React, useContext} from 'react'
import { AuthContext } from './Context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
    const {isAuthUser} = useContext(AuthContext);
 

    if (!isAuthUser) {
       return <Navigate to='/login'/>
    }
    return <>{children}</>
}
