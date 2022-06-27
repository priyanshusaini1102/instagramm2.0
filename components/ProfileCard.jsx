import { Avatar } from '@mui/material'
import React from 'react'

const ProfileCard = () => {
  return (
    <div className="p-4 flex items-center space-x-2 hover:bg-gray-50 cursor-pointer">
        <Avatar sx={{ width: 56, height: 56 }} src="https://images.pexels.com/photos/6962024/pexels-photo-6962024.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
        <div>
            <h2>Priyanshu Saini</h2>
            <div className="flex text-gray-400 text-sm"> <p className="w-44 truncate">lastbkjb messaguyyvue😀😀😀</p>| <span>1h</span> </div>
        </div>
    </div>
  )
}

export default ProfileCard