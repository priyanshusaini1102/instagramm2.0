import React, { useEffect, useState } from 'react';
import { PaperAirplaneIcon, EmojiHappyIcon, PhotographIcon, HeartIcon } from '@heroicons/react/outline';
import getRecipientEmail from '../utils/getRecipientEmail';
import { db, storage } from '../firebase';
import { collection, getDocs, orderBy,getDoc,doc,addDoc, query, where } from "firebase/firestore";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import lastSeenAgo from 'last-seen-ago';
import { useRecoilState } from 'recoil';
import {newChatModalState} from '../atoms/modalAtom';


const ChatScreen = ({ chat, messages }) => {
  const {data:session} = useSession();
  const router = useRouter();
  
  const [newMsg,setNewMsg] = useState(true); 
  const [chatUser, setChatUser] = useState(null);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useRecoilState(newChatModalState);
  
  const recipientEmail = getRecipientEmail(chat?.users,session?.user);
  const lastSeen = lastSeenAgo.getLastSeen(user?.data()?.lastSeen.seconds);

  // useEffect(()=>{
  //   if(session && router.query.id){
  //     setNewMsg(false);
  //       (async() => {
  //           const userChatRef = doc(db, "chats",`${router.query.id[0]}` );
  //           const chatSnapshot = await getDoc(userChatRef);
  //           setChatUser(chatSnapshot);
  //       })(); 
  //   }
  // },[db,session,router.query]);

  useEffect(()=>{
    if(session && recipientEmail){
      setNewMsg(false);
        (async() => {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", recipientEmail));
            const chatSnapshot = await getDocs(q);
            const chats = chatSnapshot.docs;
            setUser(chats[0]);
        })(); 
    }
  },[recipientEmail]);

  return (
    <>
      {newMsg ? (<div className="h-full w-full border p-2 flex flex-col space-y-3 items-center justify-center">
        <div className="border-2 border-black rounded-full p-4  ">
          <PaperAirplaneIcon className="h-8 w-8 md:h-24 md:w-24 rotate-45 -inset-y-1 inset-x-0.5 relative" />
        </div>
        <div className="text-center">
          <h3 className="font-light text-2xl">Your Messages {newMsg}</h3>
          <p className="text-gray-500 text-sm">Send private photos and messages to a friend or group.</p>
        </div>
        <div>
          <button className="bg-blue-500 font-semibold text-white py-1 px-2 rounded-md" onClick={()=>setOpen(true)}>Send Message</button>
        </div>
      </div>) : (
        <div className="h-full w-full flex flex-col space-y-3 items-center justify-start">
          <div className="p-3 border-b w-full flex items-center space-x-4">
            <img className="h-12 w-12 rounded-full object-cover" src={user?.data()?.photoURL} alt="" />
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">{user?.data()?.email}</h2>
              <p className="text-xs text-gray-500 font-semibold">Active {lastSeen}</p>
            </div>
          </div>
          <div className="flex-grow flex items-center">
            Chatting
          </div>
          <div className=" w-full">
            <div className="flex items-center space-x-3 border rounded-full  mx-4 mb-5 p-2 my-2">
              <EmojiHappyIcon className="h-8 w-8"/>
              <div className="flex-grow">
                <form action="" onSubmit={(e) =>e.preventDefault()}>
                  <input type="text" name="" id="" placeholder="Write your message...." className="w-full focus:outline-none mx-3"  />
                </form>
              </div>
              <PhotographIcon className="h-8 w-8" />
              <HeartIcon className="w-8 h-8" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatScreen

