import { collection, getDocs } from "firebase/firestore";
import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon  } from '@heroicons/react/outline';
import { useRecoilState } from 'recoil';
import { newChatModalState } from '../atoms/modalAtom';
import { db, storage } from '../firebase';
import { useSession } from 'next-auth/react';
import { Avatar } from '@mui/material'
import { useRouter } from 'next/router';
  
export default function ChatModal() {
    const router = useRouter();
  const [open, setOpen] = useRecoilState(newChatModalState);
  const {data : session} = useSession();
  const [users, setUsers] = useState([]);
    useEffect(()=>{
        
        (async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            const querySnapshots = querySnapshot.docs.filter(doc => doc.data().email != session?.user?.email);
            setUsers(querySnapshots);
          })();
    },[db,session]);

    useEffect(()=>{
        setOpen(false);
    },[]);

    
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
                    <input type="text" placeholder="Search..." name="" id="" className="w-full h-full p-4 focus:outline-none" />
                   
                  </div>
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
