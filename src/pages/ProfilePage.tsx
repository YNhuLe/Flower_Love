import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
function ProfilePage(){

    const navigate = useNavigate();

const [firebaseUser, setFirebaseUser] = useState<User>();
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (user) =>{
            if( !user){
                navigate("/signup");
                return;
            }
            setFirebaseUser(user);
        });
        return unsubscribe;
    }, []);

    if( !firebaseUser) return <p> Loading...</p>;
    return (
        <>
        <h1>Name:{firebaseUser.displayName} </h1>
  <h1>Welcome, {firebaseUser.displayName}</h1>
      <p>Email: {firebaseUser.email}</p>
      <p>UID: {firebaseUser.uid}</p>
        </>
    )
}

export default ProfilePage;