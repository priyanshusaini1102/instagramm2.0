import React, { useEffect, useState } from 'react';
import { PaperAirplaneIcon, EmojiHappyIcon, PhotographIcon, HeartIcon } from '@heroicons/react/outline';
import getRecipientEmail from '../utils/getRecipientEmail';
import { db, storage } from '../firebase';
import { collection, getDocs, orderBy,getDoc,limit,doc,addDoc, query, where, serverTimestamp, onSnapshot } from "firebase/firestore";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import lastSeenAgo from 'last-seen-ago';
import { useRecoilState } from 'recoil';
import {newChatModalState} from '../atoms/modalAtom';
import Message from './Message';

const NewChatScreen = () => {
    const [open, setOpen] = useRecoilState(newChatModalState);
  return (
    <>
      <div className="h-full w-full border p-2 flex flex-col space-y-3 items-center justify-center">
        <div className="border-2 border-black rounded-full p-4  ">
          <PaperAirplaneIcon className="h-8 w-8 md:h-24 md:w-24 rotate-45 -inset-y-1 inset-x-0.5 relative" />
        </div>
        <div className="text-center">
          <h3 className="font-light text-2xl">Your Messages</h3>
          <p className="text-gray-500 text-sm">
            Send private photos and messages to a friend or group.
          </p>
        </div>
        <div>
          <button
            className="bg-blue-500 font-semibold text-white py-1 px-2 rounded-md"
            onClick={() => setOpen(true)}
          >
            Send Message
          </button>
        </div>
      </div>
    </>
  )
}

export default NewChatScreen
