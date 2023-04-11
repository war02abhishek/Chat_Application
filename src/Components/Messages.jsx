import React, { useEffect, useState } from 'react'
import Message from './Message'
import { useSelector } from 'react-redux';
import { doc } from "firebase/firestore";
import { onSnapshot } from 'firebase/firestore';
import { db } from '../Pages/firebase';
import ReactScrollToBottom from "react-scroll-to-bottom";


const Messages = () => {

  const [messages,setMessages]=useState([]);
  const {user,chatId}=useSelector((state)=>state.chat)

console.log(user,chatId);
localStorage.setItem('user',JSON.stringify(user));
localStorage.setItem('chatId',JSON.stringify(chatId));
const usr=JSON.parse(localStorage.getItem('user'));
const id=JSON.parse(localStorage.getItem('chatId'));
console.log(id);


useEffect(()=>{
  if(chatId)
  {
    const unSub=onSnapshot(doc(db,"chats",chatId),(doc)=>{
      doc.exists() &&doc.data() && setMessages(doc.data().messages);
    })
    return ()=>{
      unSub()
    }
  }

},[chatId])

useEffect(()=>{
  setMessages([]);

},[user,user?.displayName])

console.log(messages)

  return (
    <div className='MessagesContainer'>
      {/* <ReactScrollToBottom> */}

      {
       messages && messages.map((m)=>(
          <Message mess={m} key={m.id}/>

        ))
      }
      {/* </ReactScrollToBottom> */}
    
    </div>
  )
}

export default Messages