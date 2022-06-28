import { collection, getDocs,addDoc, query, where } from "firebase/firestore";
import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon, LightningBoltIcon  } from '@heroicons/react/outline';
import { useRecoilState } from 'recoil';
import { newChatModalState } from '../atoms/modalAtom';
import { db, storage } from '../firebase';
import { useSession } from 'next-auth/react';
import { Avatar } from '@mui/material'
import { useRouter } from 'next/router';
import * as EmailValidator from 'email-validator';
import { async } from "@firebase/util";
 
// EmailValidator.validate("test@email.com"); // true
  
export default function ChatModal() {
  const router = useRouter();
  const [open, setOpen] = useRecoilState(newChatModalState);
  const {data : session} = useSession();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const emailRef = useRef();




  

    useEffect(()=>{
        
        (async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            const querySnapshots = await querySnapshot.docs.filter(doc => doc.data().email != session?.user?.email);
            setUsers(querySnapshots);
          })();
    },[db,session]);

    useEffect(()=>{
        setOpen(false);
    },[]);


    const newChat = async() =>{
      const value = emailRef?.current?.value;
      const isUser = await users.find(user => user.data().email === value);
      const isAlreadyExist = await chatAlreadyExists(value);
      if(EmailValidator.validate(value) && isUser  && isAlreadyExist===false){
        setOpen(false);
        await addDoc(collection(db, 'chats'), {
          users: [session?.user?.email, value],
        });
        // router.push(`/direct/${isUser.id}`)
      }
      else
      setError(`Invalid email address or User not found`);
      
    }

    const chatAlreadyExists = async(recipientEmail) => {
      const userChatRef = collection(db, "chats");
      const q = query(userChatRef, where("users", "array-contains", session?.user?.email));
      const chatSnapshot = await getDocs(q);
      chatSnapshot.docs.forEach(doc => console.log(doc.data().users[0]));
      
      return !!chatSnapshot?.docs.find(chat=>chat.data().users.find(user=> user === recipientEmail)?.length>0);
    }

    
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10"  onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg top-5 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white p-2">
                  <div className="border-b p-2 flex justify-between ">
                    <XIcon className="h-6 w-6 hover:text-red-900 cursor-pointer" onClick={() => setOpen(false)} />
                    <h2 className="font-semibold">New Message</h2>
                    <button className="text-blue-300 hover:text-blue-500">Next</button>
                  </div>
                  <div className="flex  items-center border-b">
                    <p className="font-bold whitespace-nowrap">To :</p>
                    <form onSubmit={(e) =>e.preventDefault()} className="w-full flex justify-between">
                      <input ref={emailRef} onChange={() =>setError('')}type="text" placeholder="Search..." name="" id="" className="w-full h-full p-4 focus:outline-none" />
                      <button type="submit" className="" onClick={newChat}><LightningBoltIcon className="h-6 w-6 hover:fill-black hover:scale-110 mr-4" /></button>
                    </form>
                   
                  </div>
                    {error && <p className="text-xs text-red-500">{error}</p> }
                  <div className="p-2">
                    <h2 className="font-semibold p-2">Suggested</h2>
                    {users.map(user => (
                        <div className="flex items-center space-x-3 hover:bg-gray-50 py-2 cursor-pointer" onClick={()=>router.push(`/direct/${user.id}`)}>
                                <Avatar sx={{ width: 44, height: 44 }} src={user?.data().photoURL} alt="" />
                                <p>{user?.data().name}</p>
                        </div>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>  
        </div>
      </Dialog>
    </Transition.Root>
  )
}
