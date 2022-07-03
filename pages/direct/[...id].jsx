import React, { useEffect } from 'react';
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import Sidebar from '../../components/Sidebar';
import ChatScreen from '../../components/ChatScreen';
import { useSession } from 'next-auth/react';
import { db } from '../../firebase';
import DirectPage from '../../components/DirectPage';
import {useRouter} from 'next/router';

const Direct = () => {

  const { data:session } = useSession();
  const router = useRouter();
  

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
        <DirectPage/>
    </div>
  )
}

export default Direct