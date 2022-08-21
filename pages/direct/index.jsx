import React, { useEffect } from 'react';
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import Sidebar from '../../components/Sidebar';
import ChatScreen from '../../components/ChatScreen';
import { useSession } from 'next-auth/react';
import { db } from '../../firebase';
import DirectLayout from '../../layouts/DirectLayout';
import DirectPage from '../../components/DirectPage';
import Head from 'next/head';

const Direct = () => {

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
    <div className="" >
        <Head>
          <title>Instagramm2-0</title>
          {/* <link rel="icon" href="/favicon.ico" /> */}
        </Head>
        <DirectPage/>
    </div>
  )
}

export default Direct