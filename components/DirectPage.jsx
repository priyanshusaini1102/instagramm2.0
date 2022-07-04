import React, { useEffect } from 'react';
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import Sidebar from './Sidebar';
import ChatScreen from './ChatScreen';
import { useSession } from 'next-auth/react';
import { db } from '../firebase';

const DirectPage = ({ chat, messages }) => {
    const { data:session } = useSession();
    

    // useEffect(() => {
    //   if(session){
  
    //     (async () => {
    //       await setDoc(doc(db, "users", session?.user?.uid), {
    //         email: session?.user?.email,
    //         lastSeen: serverTimestamp(),
    //         photoURL: session?.user?.image,
    //         name:session?.user?.name,
    //         username:session?.user?.username
    //       },{merge:true});
    //     })();
    //   }
      
    // },[session]);
  
    return (
      <div className="bg-gray-50 h-screen" >
          <div className="sticky top-20 bg-white h-5/6 flex max-w-6xl w-full mx-auto my-4 border border-gray-200 rounded-lg">
              <Sidebar />
              <ChatScreen chat={chat} messages={messages} />
          </div>
      </div>
    )
}

export default DirectPage