import { signOut } from 'firebase/auth'
import React,{useState,useEffect} from 'react'
import { auth } from '../Pages/firebase'
import { onAuthStateChanged } from "firebase/auth";
import {
  Navigate, useNavigate,
  
} from "react-router-dom";
import { useGlobalContext } from '../Context/AuthContext';

const Navbar = () => {
  const navigate=useNavigate();
  const [display,setDisplay]=useState("");
  const [url,setUrl]=useState("");

  const currentUser=useGlobalContext();
  console.log(currentUser)
  // const displayName = currentUser.current.displayName;
  // const photoURL = currentUser.current.photoURL;

 const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setDisplayName(user.displayName);
        setPhotoURL(user.photoURL);
      } else {
        setDisplayName('');
        setPhotoURL('');
      }
    });
    return unsubscribe;
  }, []);

  const handleSubmit = (e) => {
    signOut(auth);
    localStorage.removeItem('userToken');
    console.log('Logout successful');
    navigate('/login');
  }
  return (
    <div className='NavbarMainContainer'>
      <h1 >We Chat</h1>
      <div className="user">
      
          <img src={photoURL} alt='img' />
        <span>{displayName}</span>
        <button onClick={handleSubmit}>logout</button>
      </div>
    </div>
  )
}

export default Navbar