import React from 'react'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import Sidebar from '../components/Sidebar'
import { useState , useEffect} from 'react'
import { ChatContext } from '../../context/ChatContext'
import { useContext } from 'react'

const HomePage = () => {
   const{selectedUser ,getUsers}=useContext(ChatContext)

    useEffect(() => {
    getUsers();
  }, []);


    return (
        <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>
            <div
                className={` backdrop-blur-xl text-white border-2 border-gray-900 rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative  
                     ${selectedUser
                        ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]'
                        : 'md:grid-cols-2'
                    }`}>
            
                <Sidebar />
                <ChatContainer  />
                <RightSidebar  />
            </div>
        </div>
    )

}    
export default HomePage;