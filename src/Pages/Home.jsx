import { useGlobalContext } from '../Context/AuthContext'
import React, { useEffect } from 'react'
import Chat from '../Components/Chat'
import Sidebar from '../Components/Sidebar'
import './Home.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  const currentUser = useGlobalContext();

  useEffect(() => {
    console.log(currentUser);
    if (currentUser==null || currentUser.user == null) {
      navigate('/login')
    }
  }, [currentUser])

  return (
    <>
      {
        currentUser && (
          <>

            <div className='HomeContainer'>
              <div className="HomeSubContainer">
                <Sidebar />
                <Chat />
              </div>
            </div>
          </>
        )





      }
    </>
  )
}


export default Home