import React, { useState } from 'react'
import Chats from './Chats'
import {BsSearch} from "react-icons/bs"

import { collection, doc, query, serverTimestamp, updateDoc, where, setDoc } from "firebase/firestore";

import { db } from "../Pages/firebase"
import { getDocs, getDoc } from 'firebase/firestore';
import { useGlobalContext } from '../Context/AuthContext';


const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState("");
  const currentUser = useGlobalContext();


  const handleSearch = async () => {
    const userRef = collection(db, "users");
    console.log(username);
    console.log(currentUser);
    const q = query(userRef, where("displayName", "==", username));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });

    } catch (error) {
      console.log(error);
      setErr(error);
    }
  }

  const handlekeyDown = (e) => {
    e.code === "Enter" && handleSearch();
  }

  const handleClick = async () => {
    if (!user) return;
    
    const combinedId = currentUser.user.uid > user.uid ? currentUser.user.uid + user.uid : user.uid + currentUser.user.uid;
    // console.log("curr:",currentUser.uid);
    // console.log("user:",user.uid);

    try {
      console.log("try block: ", combinedId);

      const res = await getDoc(doc(db, "chats", combinedId));
      console.log(res);

      //if chats not exist
      if (!res.exists()) {
        //create a chat in chats collection
        try {
          console.log('seeting chats');
          await setDoc(doc(db, "chats", combinedId), { messages: [] });
          console.log('seeting successful with combined ID:',combinedId);

          // create user chats
          console.log("updating userChats");
          // const currentUserChatsRef = doc(db, "userChats", currentUser.current?.uid);
          // const currentUserChats = (await getDoc(currentUserChatsRef)).data();
          // const userChatsRef = doc(db, "userChats", user.uid);
          // const userChats = (await getDoc(userChatsRef)).data();
          console.log(currentUser.user.uid, user.uid);

          const res2 = await getDoc(doc(db, "userChats", user.uid));
          const res3 = await getDoc(doc(db, "userChats", currentUser.user.uid));
          console.log(currentUser, user);

          console.log("res3 value: ", res3);
          console.log("res2 value: ", res2);


          const userChatsRef = doc(db, "userChats", user.uid);
          const currentUserChatsRef = doc(db, "userChats", currentUser?.user?.uid);

          //some userChats exist already
          if (res2?.exists() && res3.exists()) {
            const existingUserChats = res2.data();
            const existingCurrentUserChats = res3.data();

            const updatedCurrentUserChats = {
              [combinedId]: {
                userInfo:{
                  uid: user.uid,
                  displayName: user.displayName,
                  photoURL: user.avatarUrl,
                  date: serverTimestamp(),
                }
              },
            };

            const updatedUserChats = {
              [combinedId]: {
                userInfo:{
                  uid: currentUser.user.uid,
                  displayName: currentUser.user.displayName,
                  photoURL: currentUser.user.photoURL,
                  date: serverTimestamp(),
                }
              },
            };

            const mergedUserChats = { ...existingUserChats, ...updatedUserChats };
            const mergedCurrentUserChats = { ...existingCurrentUserChats, ...updatedCurrentUserChats };

            await setDoc(currentUserChatsRef, mergedCurrentUserChats);
            console.log("update doc success for user1");

            await setDoc(userChatsRef, mergedUserChats);
            console.log("update doc success for user2");
          }

          else if(!res2.exists() && !res3.exists()) {
            //No prev userChats with any user so set it
            console.log(currentUser, user);
            await setDoc(userChatsRef, {
              [combinedId]: {
                userInfo: {
                  uid: currentUser.user.uid,
                  displayName: currentUser.user.displayName,
                  photoURL: currentUser.user.photoURL,
                },
                date: serverTimestamp()
              }
            })
            await setDoc(currentUserChatsRef, {
              [combinedId]: {
                userInfo: {
                  uid: user.uid,
                  displayName: user.displayName,
                  photoURL: user.avatarUrl

                },
                date: serverTimestamp()
              }
            })

          }
           else if(!res2.exists() && res3.exists())
          {
            await setDoc(userChatsRef, {
              [combinedId]: {
                userInfo: {
                  uid: currentUser?.user.uid,
                  displayName: currentUser?.user.displayName,
                  photoURL: currentUser?.user.photoURL,
                },
                date: serverTimestamp()
              }
            })
             const updatedCurrentUserChats = {
              [combinedId]: {
                userInfo:{
                  uid: user.uid,
                  displayName: user.displayName,
                  photoURL: user.avatarUrl,
                  date: serverTimestamp(),
                }
              },
            };
            await updateDoc(currentUserChatsRef, updatedCurrentUserChats, { merge: true });
            console.log("update doc success for user1");
          }
          else if(res2.exists() && !res3.exists())
          {
            await setDoc(currentUserChatsRef, {
              [combinedId]: {
                userInfo: {
                  uid: user.uid,
                  displayName: user.displayName,
                  photoURL: user.avatarUrl

                },
                date: serverTimestamp()
              }
            })
            
            const updatedUserChats = {
              [combinedId]: {
                userInfo:{
                  uid: currentUser.user.uid,
                  displayName: currentUser.user.displayName,
                  photoURL: currentUser.user.photoURL,
                  date: serverTimestamp(),
                }
              },
            };

            await updateDoc(userChatsRef, updatedUserChats, { merge: true });
            console.log("update doc success for user2")

          }


        } catch (error) {
          console.log(error);
        }
      }

      //chats exists
      else {
        try {

          // create user chats
          console.log("updating userChats");
          // const currentUserChatsRef = doc(db, "userChats", currentUser.current?.uid);
          // const currentUserChats = (await getDoc(currentUserChatsRef)).data();
          // const userChatsRef = doc(db, "userChats", user.uid);
          // const userChats = (await getDoc(userChatsRef)).data();
          const res2 = await getDoc(doc(db, "userChats", user?.uid));
          const res3 = await getDoc(doc(db, "userChats", currentUser?.user.uid));

          console.log("res3 value: ", res3);
          console.log("res2 value: ", res2);


          const userChatsRef = doc(db, "userChats", user.uid);
          const currentUserChatsRef = doc(db, "userChats", currentUser?.user.uid);

          //chats exits userChats exist already
          if (res2?.exists() && res3.exists()) {
            const updatedCurrentUserChats = {
              [combinedId]: {
                userInfo:{
                  uid: user.uid,
                  displayName: user.displayName,
                  photoURL: user.avatarUrl,
                  date: serverTimestamp(),
                }
              },
            };

            const updatedUserChats = {
              [combinedId]: {
                userInfo:{
                  uid: currentUser.user.uid,
                  displayName: currentUser.user.displayName,
                  photoURL: currentUser.user.photoURL,
                  date: serverTimestamp(),
                }
              },
            };


            await updateDoc(currentUserChatsRef, updatedCurrentUserChats, { merge: true });
            console.log("update doc success for user1");

            await updateDoc(userChatsRef, updatedUserChats, { merge: true });
            console.log("update doc success for user2")


            // const userData = {
            //   uid: user.uid,
            //   displayName: user.displayName,
            //   photoURL: user.avatarUrl,
            //   date: serverTimestamp(),
            // };

            // const currentUserData = {
            //   uid: currentUser.user?.uid,
            //   displayName: currentUser.user?.displayName,
            //   photoURL: currentUser.user?.photoURL,
            //   date: serverTimestamp(),
            // };
            //  const userDataFirestore = {
            //   uid: userData.uid,
            //   displayName: userData.displayName,
            //   photoURL: userData.photoURL,
            //   date: serverTimestamp(),

            //   // convert custom object to Firestore data type
            //   customObject: JSON.stringify(userData.customObject),
            // };
            // const CurrentuserDataFirestore = {
            //   uid: currentUser?.user.uid,
            //   displayName: currentUser?.user.displayName,
            //   photoURL: currentUser?.user.photoURL,
            //   date: serverTimestamp(),

            //   // convert custom object to Firestore data type
            //   customObject: JSON.stringify(currentUserData.customObject),
            // };
            // const updatedCurrentUserChats = {
            //   ...res3,
            //   [combinedId]: userDataFirestore,
            // };

            // const updatedUserChats = {
            //   ...res2,
            //   [combinedId]: CurrentuserDataFirestore,
            // };
            // const sObject1 = JSON.parse(JSON.stringify(updatedUserChats));
            // const sObject2 = JSON.parse(JSON.stringify(updatedCurrentUserChats));
            // console.log(sObject1);
            // console.log(sObject2);

            // await updateDoc(currentUserChatsRef, sObject2);
            // console.log("update doc success for user1");

            // await updateDoc(userChatsRef,sObject1);
            // console.log("update doc success for user2");
            // Document exists, so update it

          }
          // chats exists user Chats Not exists simply setDocs
          else if(!res2?.exists() && !res3.exists()) {

            await setDoc(userChatsRef, {
              [combinedId]: {
                userInfo: {
                  uid: currentUser?.user.uid,
                  displayName: currentUser?.user.displayName,
                  photoURL: currentUser?.user.photoURL,
                },
                date: serverTimestamp()
              }
            })
            await setDoc(currentUserChatsRef, {
              [combinedId]: {
                userInfo: {
                  uid: user.uid,
                  displayName: user.displayName,
                  photoURL: user.avatarUrl

                },
                date: serverTimestamp()
              }
            })

          }
          else if(!res2.exists() && res3.exists())
          {
            await setDoc(userChatsRef, {
              [combinedId]: {
                userInfo: {
                  uid: currentUser?.user.uid,
                  displayName: currentUser?.user.displayName,
                  photoURL: currentUser?.user.photoURL,
                },
                date: serverTimestamp()
              }
            })
             const updatedCurrentUserChats = {
              [combinedId]: {
                userInfo:{
                  uid: user.uid,
                  displayName: user.displayName,
                  photoURL: user.avatarUrl,
                  date: serverTimestamp(),
                }
              },
            };
            await updateDoc(currentUserChatsRef, updatedCurrentUserChats, { merge: true });
            console.log("update doc success for user1");
          }
          else if(res2.exists() && !res3.exists())
          {
            await setDoc(currentUserChatsRef, {
              [combinedId]: {
                userInfo: {
                  uid: user.uid,
                  displayName: user.displayName,
                  photoURL: user.avatarUrl

                },
                date: serverTimestamp()
              }
            })
            
            const updatedUserChats = {
              [combinedId]: {
                userInfo:{
                  uid: currentUser.user.uid,
                  displayName: currentUser.user.displayName,
                  photoURL: currentUser.user.photoURL,
                  date: serverTimestamp(),
                }
              },
            };

            await updateDoc(userChatsRef, updatedUserChats, { merge: true });
            console.log("update doc success for user2")

          }
        } catch (error) {
          console.log(error);
        }
      }
      setUser(null);
      setUsername("");
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="SearchContainer">
      <div className="SearchForm">
        <input onKeyDown={handlekeyDown} onChange={(e) => setUsername(e.target.value)} type="text" value={username} placeholder='Find a user' />
        <BsSearch onClick={handleSearch}/>
      </div>
      {
        err && <span>Some thing went wrong
        </span>
      }
      {
        user &&
        <div onClick={handleClick} className="SearchUserChat">
          <img src={user.avatarUrl} alt='' />
          <div className="UserChatInfo">
            <span>{user.displayName}</span>

          </div>
        </div>
      }
    </div>
  )
}

export default Search