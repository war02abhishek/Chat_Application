import React from 'react'
import Chats from './Chats'
import Navbar from './Navbar'
import Search from './Search'
import './Style.css'

const Sidebar = () => {
  return (
    <div className='SidebarMainContainer'>
      <Navbar/>
      <Search/>
      <Chats/>       
        
    </div>
  )
}

export default Sidebar