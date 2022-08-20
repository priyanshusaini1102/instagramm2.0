import { Avatar } from '@mui/material'
import React,{useState, useEffect} from 'react';
import {useSession} from 'next-auth/react';
import getRecipientEmail from '../utils/getRecipientEmail';
import { db, storage } from '../firebase';
import { collection, getDocs,addDoc, query, where } from "firebase/firestore";

const ProfileCard = ({users}) => {
  const {data:session} = useSession();
  const recipientEmail = getRecipientEmail(users,session?.user);
  const [recipient,setRecipient] = useState(null);

  useEffect(()=>{
    if(session){
        (async() => {
            const userChatRef = collection(db, "users");
            const q = query(userChatRef, where("email", "==", recipientEmail));
            const chatSnapshot = await getDocs(q);
            setRecipient(chatSnapshot.docs[0]);
        })(); 
    }
  },[db]);


  
  return (
    <div className={`p-4 flex items-center space-x-2 hover:bg-gray-50 cursor-pointer`}>
        <Avatar sx={{ width: 56, height: 56 }} src={recipient?.data().photoURL} alt="" />
        <div>
            <h2>{recipient?.data().name}</h2>
            <div className="flex text-gray-400 text-sm"> <p className="w-44 truncate">{recipient?.data().username}</p></div>
        </div>
    </div>
  )
}

export default ProfileCard