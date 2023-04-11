import { useGlobalContext } from '../Context/AuthContext'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

const Message = (mess) => {
  console.log("message: ",mess?.mess)

  const currentUser=useGlobalContext();
  const {user,chatId}=useSelector((state)=>state.chat);
  const ref=useRef();
// const message = { text: 'Hello World', date: new Date(), id: 1, senderId: 1234 }
console.log(currentUser);

useEffect(() => {
  ref?.current.scrollIntoView({behavior:"smooth"});

}, [mess.mess]);


  const formatTime = (timestamp) => {
    const timestampInSeconds = timestamp.seconds; // Example timestamp in seconds
    const timestampInNanoseconds = timestamp.nanoseconds; // Example timestamp in nanoseconds

 



    // Convert timestamp to milliseconds
    const timestampInMillis = (timestampInSeconds * 1000) + (timestampInNanoseconds / 1000000);

    // Create Date object from timestamp in milliseconds
    const timestampDate = new Date(timestampInMillis);

    
    // Extract date and time from the Date object
    const date = timestampDate.toLocaleDateString();
    const time = timestampDate.toLocaleTimeString();


    // Get the current time
    const now = new Date();

    // Calculate the time elapsed in seconds
    const elapsedTime = Math.floor((now - timestampDate) / 1000);

    // Display "Just Now" if less than 60 seconds
    if (elapsedTime < 60) {
      return "Just Now";
    }

    // Display "X minutes ago" if less than 60 minutes
    if (elapsedTime < 3600) {
      const minutes = Math.floor(elapsedTime / 60);
      return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
    }

    // Display "X hours ago" if less than 24 hours
    if (elapsedTime < 86400) {
      const hours = Math.floor(elapsedTime / 3600);
      return `${hours} hr${hours > 1 ? "s" : ""} ago`;
    }
   

  
    return `date: ${date}`;
  }

  return (
    <div className={`Message ${mess?.mess?.senderId===currentUser?.user.uid && "owner"}`}>
        <div className="MessageInfo">
            <img src={mess?.mess.senderId ===currentUser.user?.uid ?currentUser?.user.photoURL:user?.photoURL } alt="a" />
             <span>{formatTime((mess?.mess.date))}</span> {/* Display the formatted date */}
        </div>
        <div className="MessageContent">
           {mess?.mess.text && <p>{mess?.mess?.text}</p> }
            <img src={mess?.mess.img} alt="" />
          
        </div>
        <div ref={ref}></div>
    </div>
  )
}

export default Message