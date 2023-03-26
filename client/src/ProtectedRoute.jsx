import { useContext} from 'react'
import { AuthContext } from './Context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({children}) {
    const {isAuthUser} = useContext(AuthContext);
    const location = useLocation();
 

    if (!isAuthUser) {
       return <Navigate to='/login' state={{from:location?.pathname}} replace/>
    }
    return <>{children}</>
}
