import React from 'react'
import './Style.css'
import {BsCameraVideoFill} from 'react-icons/bs'
import {IoMdContacts} from 'react-icons/io'
import {HiDotsHorizontal} from 'react-icons/hi'
import Messages from './Messages'
import Input from './Input'
import { useSelector } from 'react-redux'


const Chat = () => {

 const {user}=useSelector((state)=>state.chat);
  
  return (
    <div className='ChatMainContainer'>
      <div className="chatInfo">
        <span>{user.displayName}</span>
        <div className="chatIcons">
          <BsCameraVideoFill size={20}color="lightgray"/>
          <IoMdContacts size={20}color="lightgray"/>
          <HiDotsHorizontal size={20}color="lightgray"/>
        </div>
      </div>
        <Messages/>
        <Input/>



    </div>
  )
}

export default Chat