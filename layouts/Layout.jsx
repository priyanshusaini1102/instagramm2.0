import Header from '../components/Header';
import Modal from '../components/Modal';
import BottomBar from '../components/BottomBar';
import {useSession} from 'next-auth/react';
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';

import React,{ useEffect } from 'react'

const Layout = ({children}) => {
  const { data : session} = useSession();

  useEffect(() => {
    if(session){
      (async () => {
        await setDoc(doc(db, "users", session?.user?.uid), {
          email: session?.user?.email,
          lastSeen: serverTimestamp(),
          photoURL: session?.user?.image,
          name:session?.user?.name,
          username:session?.user?.username
        },{merge:true});
      })();
    }
    
  },[session]);

  
  return (
    <div className="bg-gray-50">
      <Header/>
      <Modal/>
      {session && <BottomBar />}
      {children}
    </div>
  )
}

export default Layout