import React, { useState } from 'react';
import { BsImageFill } from "react-icons/bs"
import { useNavigate } from 'react-router-dom';
import { auth, storage, db } from "./firebase";

// Firestore is a real-time NoSQL document database that can store structured and unstructured data, while Firebase Storage is a cloud storage solution for storing and serving user-generated content such as images, videos, and audio files.

const Register = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFileChange = (event) => {
    console.log(file);
    setFile(event.target.files[0]);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          // Upload user avatar to Firebase Storage
          const storageRef = storage.ref();
          const fileRef = storageRef.child(`avatars/${auth.user.uid}`);
            // Set the content type of the uploaded file to image/jpeg
          const metadata = {
            contentType: 'image/jpeg'
          };
          const uploadTask = fileRef.put(file, metadata);
          const userRef = db.collection('users').doc(auth.user.uid);
          uploadTask.on('state_changed',
            null,
            (error) => {
              console.log(error);
            },
            () => {
              // Get the avatar download URL
              uploadTask.snapshot.ref.getDownloadURL()
                .then((downloadURL) => {
                  userRef.set({
                    displayName: displayName,
                    email: email,
                    uid:auth.user.uid,
                    avatarUrl: downloadURL // assuming you already have a valid URL for the avatar image
                  })
                  // Update user profile with display name and avatar URL
                  auth.user.updateProfile({
                    displayName: displayName,
                    photoURL: downloadURL
                  })
                    .catch(err => alert(err.message))
                })
                .then(() => {
                  navigate('/');
                   window.location.reload();
                })
                .catch(err => alert(err.message))
            }
          );
        }
      })
      .catch(err => alert(err.message))
  };

  return (
    <div className="RegisterMainContainer">
       <div>.</div>
      <div className="register-container">
        <h2>We Chat</h2>
        <div className="form-container">
          <div className="form-group">
            <input
              type="text"
              id="display-name"
              value={displayName}
              placeholder="Display Name"
              onChange={handleDisplayNameChange}
              required
            />
          </div>
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
          <div className="form-group">
            <input type="file" id="file" onChange={handleFileChange}
              required />
            {/* <label htmlFor='file'>  
            <BsImageFill className='selectRegister' size={25}color="lightgray"/>
            <span>Add an avatar</span>
              </label> */}

          </div>
          <button onClick={handleSignUp}>Sign Up</button>
          <p>Already have an account? <a href="/login">Log In</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
