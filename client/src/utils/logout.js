import { getAuth, signOut } from "firebase/auth";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

export function logout(redirect){
    // const location =  useNavigate();
    // const currentURL = window.location
// console.log(currentURL)
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    //   location(redirect)
    throw new Error("Not implemented")
    }).catch((error) => {
      alert('Sign-out failed happened in : '+redirect+ ':' +error.message)
       Navigate(redirect)
    });

}
