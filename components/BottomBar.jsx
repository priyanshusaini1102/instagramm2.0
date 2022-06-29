import React from 'react';
import Image from 'next/image';
import {
  SearchIcon,
  PlusIcon,
  HeartIcon,
  UserIcon,
  PaperAirplaneIcon,
  MenuIcon
} from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid';
import { signIn,signOut,useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import {modalState} from '../atoms/modalAtom';


const BottomBar = () => {

  const { data : session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();

  return (
    <div className="bg-white md:hidden flex items-center fixed bottom-0 justify-evenly w-screen border-t-2 shadow-sm py-3 ">
        <div className="relative h-6 w-6 bottomBtn" onClick={()=> router.push('/')} >
          <HomeIcon />
        </div>
        <div className="relative h-6 w-6" onClick={()=>router.push('/explore')}>
          <Image layout="fill" src="/compass.png" />
        </div>
        
        <div className="relative h-6 w-6 bottomBtn" onClick={()=>setOpen(true)} >
          <PlusIcon  />
        </div>
        <div className="relative h-6 w-6 bottomBtn">
          <HeartIcon  />
        </div>
        <div className="relative h-6 w-6 bottomBtn" onClick={signOut}>
          {session?.user?.image ? (<div  className="relative rounded-full object-cover h-8 w-8 -inset-y-0.5">
            <img src={session.user.image} alt="" className="rounded-full object-cover h-8 w-8" />
          </div>) :(
          <UserIcon  />)}
        </div>
    </div>
  )
}

export default BottomBar