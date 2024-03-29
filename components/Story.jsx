import React from 'react'

const Story = ({img,username}) => {
  return (
    <div className="my-2 flex-shrink-0 cursor-pointer truncate w-14 h-14 rounded-full">
        <img src={img} alt={username} className=" w-14 h-14 object-cover rounded-full p-[1.5px] border-2 border-red-600" />
        <p className="text-center mt-2 text-xs w-14 truncate font-semibold" >{username}</p>
    </div>
  )
}

export default Story