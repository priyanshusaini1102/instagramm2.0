import React from 'react';
import { useEffect, useState } from 'react';
import Story from './Story';
import { useSession } from 'next-auth/react';
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";

const Stories = () => {
  const [suggestions, setSuggestions] = useState([]);
  const { data : session } = useSession();
    useEffect(()=>{
      if(session){
        (async () => {
          let querySnapshot = await getDocs(collection(db, "users"));
          const users = querySnapshot.docs.filter(user=> user.data().email !== session.user.email);
          setSuggestions(users);
        })();
      }
    },[db,session]);

  return (
    <div className="border mx-5 bg-white rounded-lg shadow-inner p-2 flex flex-row pl-4 space-x-4 overflow-y-scroll  hideScroll">

      {session && (
        <Story img={session.user.image} username={session.user.username} />
      ) }
        
      {suggestions.map(profile => <Story key={profile.id} img={profile.data().photoURL} username={profile.data().username} />)}
        
    </div> 
  )
}

export default Stories