import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import ChatScreen from '../../components/ChatScreen';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import DirectPage from '../../components/DirectPage';
import getRecipientEmail from '../../utils/getRecipientEmail';
import { db, storage } from '../../firebase';
import { doc, setDoc, serverTimestamp, collection, getDocs, orderBy,getDoc,addDoc, query, where } from "firebase/firestore";
import lastSeenAgo from 'last-seen-ago';

const Direct = ({chat, messages,id}) => {

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
        <DirectPage id={id} chat={chat} messages={messages} />
    </div>
  )
}

export default Direct;

export async function getServerSideProps(context){
  
  const userChatRef = doc(db, "chats",`${context.query.id[0]}` );
  //prep the messages
  const messagesRef = collection(userChatRef, "messages");
  const q = query(messagesRef, orderBy("timestamp", "asc"));
  const messageSnapshot = await getDocs(q);
  const messages = messageSnapshot.docs.map((doc)=>({
    id:doc.id,
    ...doc.data(),
  })).map(messages=>({
    ...messages,
    timestamp: messages.timestamp.toDate().getTime(),
  }));
  //prep the chats
  const chatRef = await getDoc(userChatRef);
  const chat = {
    id:chatRef.id,
    ...chatRef.data(),
  }
  
  // console.log({chat,messages});
  return {
    props: {
      messages: JSON.stringify(messages),
      chat:chat,
      id: context.query.id[0]
    }
  }
      
}