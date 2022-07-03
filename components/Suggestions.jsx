import React,{ useEffect, useState } from 'react';

import { db, storage } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import { useSession } from 'next-auth/react';

const Suggestions = () => {

  const [suggestions, setSuggestions] = useState([]);
  const { data : session } = useSession();
    useEffect(()=>{
        (async () => {
            let querySnapshot = await getDocs(collection(db, "users"));
            const querySnapshots = querySnapshot.docs.filter(doc => doc.data().email != session.user.email);
            setSuggestions(querySnapshots);
          })();
    },[db]);

  

  return (
    <div className="my-4 p-2 sticky top-52">
      <div className="flex text-sm items-center justify-between" >
        <h3 className=" text-gray-400 ">Suggestions for you</h3>
        <button className="font-semibold">See All</button>
      </div>

      {suggestions.map((profile)=> (
        <div key={profile.id} className="flex items-center justify-between mt-3" >
          <img className="w-10 h-10 object-cover rounded-full border p-[1.5px]" src={profile.data().photoURL} alt="" />
        
          <div className="flex-1 ml-2">
            <h2 className="font-semibold text-sm">{profile.data().name}</h2>
            <h3 className="text-xs text-gray-400">{profile?.data()?.username}</h3>
          </div>

          <button className="text-blue-500 text-sm font-semibold">Follow</button>
        </div>
      ))}
    </div>
  )
}

export default Suggestions