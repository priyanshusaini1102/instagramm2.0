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

const Header = () => {

  const { data : session } = useSession();
  
  return (
    <div className="bg-white w-screen shadow-sm fixed top-0">
      <div className="relative bg-white py-3 w-screen mx-auto flex px-6 justify-between max-w-6xl">
      {/* Left */}
      <div>
        <div className="relative hidden lg:inline-grid w-28 h-10  cursor-pointer ">
          <Image layout="fill" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2880px-Instagram_logo.svg.png" />
        </div>
        <div className="relative lg:hidden w-10 h-10 cursor-pointer">
          <Image layout="fill" src="https://links.papareact.com/jjm" />
        </div>
      </div>

      {/* Middle */}
        <div className="md:flex relative justify-center h-10 my-auto ">
          <div className="absolute my-2 left-2 border-1 border-black ">
            <SearchIcon className="h-6 w-6 opacity-30" />
          </div>
            <input type="text" placeholder="Search" className="h-full border-2 pl-9 focus:border-black bg-gray-200 shadow-inner rounded-lg"/>
        </div>

      {/* Right */}
        <div className="flex items-center justify-between md:w-64">
          {session ? (
            <>
            <div className="md:hidden relative h-6 w-6">
              <MenuIcon />
            </div>
            <div className="relative h-6 w-6 navBtn">
              <HomeIcon />
            </div>
            <div className="relative h-6 w-6 -inset-y-0.5 navBtn">
              <PaperAirplaneIcon className="rotate-45 " />
              <div className="absolute -top-1 text-xs -right-0.5 text-white bg-red-500 w-4 h-4 text-center rounded-full">3</div>
            </div>
            <div className="relative h-6 w-6 navBtn">
              <PlusIcon  />
            </div>
            <div className="relative h-6 w-6 navBtn">
              <Image layout="fill" src="/compass.png" />
            </div>
            <div className="relative h-6 w-6 navBtn">
              <HeartIcon  />
            </div>
            <div className="relative navBtn">
              <div onClick={signOut} className="relative rounded-full object-cover h-8 w-8 -inset-y-0.5">
                <img src={session.user.image} alt="" />
              </div>
            </div>
            </>
          ) : (
            <>
            <div></div>
            <button onClick={signIn} className="font-bold border-2 border-black px-2 py-1 rounded-md hover:bg-black hover:text-white">Sign In</button>
            </>
          )}
          
        </div>
        

      
      </div>
    </div>
  )
}

export default Header