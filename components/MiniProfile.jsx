import React, {useState} from 'react';
import { signOut, useSession } from 'next-auth/react';

const MiniProfile = () => {

  const { data: session } = useSession();
  
  return (
    
      <div className="flex items-center justify-between drop-shadow-xl shadow-inner p-2 h-fit sticky top-28">
        <img className="w-16 h-16 rounded-full object-cover p-[2px] border" src={session?.user?.image ? session.user.image : "https://cdn.pixabay.com/photo/2016/11/21/14/53/man-1845814_960_720.jpg"} alt="" />
        <div className="flex-1 ml-3">
      
          <h2 className="font-semibold" >{session?.user?.username}</h2>
          <h3 className="text-gray-500 " >{session?.user?.name}</h3>
        </div>

        <button onClick={signOut} className="text-blue-500 font-semibold " >Sign out</button>


      </div>
  )
}

export default MiniProfile