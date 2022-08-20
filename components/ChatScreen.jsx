import React, { useEffect, useState } from 'react'
import {
  PaperAirplaneIcon,
  EmojiHappyIcon,
  PhotographIcon,
  HeartIcon,
} from '@heroicons/react/outline'
import getRecipientEmail from '../utils/getRecipientEmail'
import { db, storage } from '../firebase'
import {
  collection,
  getDocs,
  orderBy,
  getDoc,
  limit,
  doc,
  addDoc,
  query,
  where,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import lastSeenAgo from 'last-seen-ago'
import { useRecoilState } from 'recoil'
import { newChatModalState } from '../atoms/modalAtom'
import Message from './Message'

const ChatScreen = ({ chat, messages }) => {
  const { data: session } = useSession()
  const router = useRouter()

  const [newMsg, setNewMsg] = useState(true)
  const [user, setUser] = useState(null)
  const [open, setOpen] = useRecoilState(newChatModalState)
  const [latestMessage, setLatestMessage] = useState([]);
  
  const initialMsg = JSON.parse(messages ? messages : null)
  const [messagesSnapshot, setMessagesSnapshot] = useState([]);
  // const latestMessages = initialMsg;
  

  const [input, setInput] = useState('');

  const recipientEmail = getRecipientEmail(chat?.users, session?.user);
  const lastSeen = lastSeenAgo.getLastSeen(user?.data().lastSeen.seconds);

  // const showMessages = () => {
  //   if(messagesSnapshot) {
  //     return messagesSnapshot.docs.map(msg => (
  //       <Message
  //         recipientEmail={recipientEmail}
  //         senderEmail={msg?.data().user}
  //         user={msg?.data().photoURL}
  //         message={msg?.data().message}
  //       />
  //     ))
  //   }
  // }

  const sendMessage = async (e) => {
    e.preventDefault();
    const chatRef = doc(db, 'chats', chat.id);
    const msgRef = await addDoc(collection(chatRef, 'messages'), {
      timestamp: serverTimestamp(),
      message: input,
      user: session?.user?.email,
      photoURL: session?.user?.image,
    });

    setInput('');
  }

  useEffect(() => {
    if (session && recipientEmail) {
      setNewMsg(false)
      const chatsRef = doc(db, 'chats', chat?.id);
      const messagesRef = collection(chatsRef, 'messages');
      const qmsg = query(messagesRef, orderBy('timestamp'));
      const unsubs = onSnapshot(
        qmsg,
        { includeMetadataChanges: false },
        (ob) => {
          const newMsgs = ob.docs.map((item) => ({
              id: item.id,
              timestamp: item.data().timestamp?.toDate().getTime(),
              ...item.data()
            })).map((message) => ({
                  ...message,
            }))
            setMessagesSnapshot(newMsgs);
        }
      )
    }
  }, [onSnapshot,chat.id]);

  useEffect(() => {
    if (session && recipientEmail) {
      setNewMsg(false)
      ;(async () => {
        const usersRef = collection(db, 'users')
        const q = query(usersRef, where('email', '==', recipientEmail))
        const chatSnapshot = await getDocs(q)
        const chats = chatSnapshot.docs
        setUser(chats[0])
      })()
    }
  }, [chat?.id])

  return (
    <>
      {
        <div className="h-full w-full flex flex-col space-y-0 items-center justify-start">
          <div className="p-3 border-b w-full flex items-center space-x-4">
            <img
              className="h-12 w-12 rounded-full object-cover"
              src={user?.data()?.photoURL}
              alt=""
            />
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">{recipientEmail}</h2>
              <p className="text-xs text-gray-500 font-semibold capitalize">
                Active {lastSeen}
              </p>
            </div>
          </div>
          <div className="flex-grow w-full h-full block  hover:flex flex-col justify-end px-2 overflow-y-auto ">
          
            {messagesSnapshot?.map((msg) => (
              <Message
                recipientEmail={recipientEmail}
                senderEmail={msg?.user}
                user={msg?.photoURL}
                message={msg?.message}
              />
            ))}
          </div>
          <div className="w-full">
            <div className="flex items-center space-x-3 border rounded-full  mx-4 mb-5 p-2 my-2">
              <EmojiHappyIcon className="h-8 w-8" />
              <div className="flex-grow">
                <form action="" onSubmit={sendMessage}>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    name=""
                    id=""
                    placeholder="Write your message...."
                    className="w-full focus:outline-none mx-3"
                  />
                  <button hidden type="submit"></button>
                </form>
              </div>
              <PhotographIcon className="h-8 w-8 hover:opacity-70" />
              <HeartIcon className="w-8 h-8 hover:fill-red-600 hover:text-red-500" />
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default ChatScreen
