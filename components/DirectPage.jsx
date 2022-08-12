import React, { useEffect } from 'react';
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import Sidebar from './Sidebar';
import ChatScreen from './ChatScreen';
import { useSession } from 'next-auth/react';
import { db } from '../firebase';
import NewChatScreen from './NewChatScreen';

const DirectPage = ({ chat, messages, id }) => {
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
          <div className="sticky top-20 bg-white h-5/6 mb-14  md:mb-4 flex max-w-6xl w-fit md:w-full z-0 mx-auto md:my-4 border border-gray-200 rounded-lg">
              <Sidebar id={id} />
              {id ?<ChatScreen chat={chat} messages={messages}/> :  <NewChatScreen /> }
          </div>
      </div>
    )
}

export default DirectPage