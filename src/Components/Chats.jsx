import { useGlobalContext } from '../Context/AuthContext';
import { onSnapshot,doc} from 'firebase/firestore';
import React,{useState,useEffect} from 'react'
import { db } from '../Pages/firebase';
import { useDispatch } from 'react-redux';

const Chats = () => {
  const [chats,setChats]=useState({});
  const currentUser=useGlobalContext();
  const dispatch=useDispatch();

  useEffect(()=>{
    const getChats=()=>{
      const unsub=onSnapshot(doc(db,"userChats",currentUser.user.uid),(doc)=>{
        console.log("CurrentData: ",doc.data());
        // setChats(Object.entries(doc.data()));
        setChats((doc.data()));

        // setChats(Object.entries(doc.data())[0]);
        // console.log(Object.entries(doc.data()))
      })
       //cleanup
      return ()=>{
        unsub();
      }
    }

    currentUser?.user.uid && getChats();

  },[currentUser?.user.uid])

// console.log(Object.entries(chats))
console.log(chats);
const HandleClick =(info)=>{
  console.log("dispatch USER:",info)
  dispatch({type:"CHANGE_USER",payload:{info,currentUser:currentUser.user}})
}


  return (
    <div className="Chats">
      {
      chats && Object.entries(chats)?.map((chat)=>{
            //  chats.map((chat)=>{

            // if (chat[0]?.userInfo?.uid ) {
              return(
    
          <div className="SearchUserChat" key={chat[0]} onClick={()=>HandleClick(chat[1])}>
            <img src={chat[1].userInfo.photoURL}alt=''/>
                      <div className="UserChatInfo">
                    <span>{chat[1].userInfo.displayName}</span>
                    <p>{chat[1]?.lastMessage?.text}</p>
                </div>
            </div>
    
              )

            // }

        })
      }
          

    </div>
  )
}

export default Chats