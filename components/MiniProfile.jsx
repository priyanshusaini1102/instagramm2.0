import React from 'react'

const MiniProfile = () => {
  return (
    <div className="flex items-center justify-between shadow-inner p-2 h-fit">
      <img className="w-16 h-16 rounded-full object-cover p-[2px] border" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
      <div className="flex-1 ml-3">
    
        <h2 className="font-semibold" >priyanshusainimusic</h2>
        <h3 className="text-gray-500 " >Priyanshu Saini</h3>
      </div>

      <button className="text-blue-400 " >Sign out</button>


    </div>
  )
}

export default MiniProfile