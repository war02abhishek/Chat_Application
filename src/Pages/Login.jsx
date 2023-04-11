import React, { useEffect, useState } from 'react';
import { auth } from "./firebase";
import { googleProvider, facebookProvider, linkedInProvider } from "./firebase";
import { useNavigate } from 'react-router-dom';

import {AiFillGoogleCircle} from "react-icons/ai"
import {BsFacebook,BsMicrosoft} from "react-icons/bs"



const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();



  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };



  const handleLogin = (e) => {
    // Add code here to sign up the user with the given information
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(auth => {
        console.log('Login successful', auth)
        localStorage.setItem('userToken', JSON.stringify(auth));
        navigate('/')//if it is sucessful
      })
      .catch(error => alert(error.message))
  };
  const handleSignInWithGoogle = () => {
    auth.signInWithPopup(googleProvider)
      .then(auth => {
        console.log('Google sign-in successful', auth);
        localStorage.setItem('userToken', JSON.stringify(auth));
        navigate('/');
      })
      .catch(error => alert(error.message));
  };
  const handleSignInWithFacebook = () => {
    auth.signInWithPopup(facebookProvider)
      .then(auth => {
        console.log('Facebook sign-in successful', auth);
        localStorage.setItem('userToken', JSON.stringify(auth));
        navigate('/');
      })
      .catch(error => alert(error.message));
  };
  const handleSignInWithLinkedIn = () => {
    auth.signInWithPopup(linkedInProvider)
      .then(auth => {
        console.log('LinkedIn sign-in successful', auth);
        localStorage.setItem('userToken', JSON.stringify(auth));
        navigate('/');
      })
      .catch(error => alert(error.message));
  };

  return (
    <div className="RegisterMainContainer">

      <div className="login-container">
        <h2>We Chat</h2>
        <div className="form-container">

          <div className="form-group">
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-group">

            <input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={handlePasswordChange}
              required
            />
          </div>

          <div className="firebaselogins">
           
           <span className='firebaseIcon'>
              <AiFillGoogleCircle size={36} color='#007bff' onClick={handleSignInWithGoogle}/>
           </span>
           <span className='firebaseIcon'>
               <BsFacebook size={30} color='#007bff' onClick={handleSignInWithFacebook}/>
           </span>
           {/* <span className='firebaseIcon'>
              <BsMicrosoft size={30} color='#007bff' onClick={handleSignInWithLinkedIn}/>
            </span>  */}
          </div>
          <button onClick={handleLogin}>Login</button>

          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
