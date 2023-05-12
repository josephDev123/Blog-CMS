import { getAuth, signOut } from "firebase/auth";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

export function logout(redirect){
    const currentURL = window.location
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
     // The user will be automatically logout because there an higher component that logout user when the user is undefined or null
     console.log('Sign-out successful')
    }).catch((error) => {
       alert('Sign-out failed happened in: ' +error.message);
       Navigate(currentURL.pathname)
    });

}
