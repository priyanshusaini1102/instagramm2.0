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


const Header = () => {
  return (
    <div className="bg-white border-b-2 w-screen shadow-sm py-3 mb-7">
      <div className="flex px-6 justify-between max-w-6xl mx-auto">
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
        <div className="md:flex relative justify-center hidden h-10 my-auto ">
          <div className="absolute my-2 left-2 border-1 border-black ">
            <SearchIcon className="h-6 w-6 opacity-30" />
          </div>
            <input type="text" placeholder="Search" className="h-full border-2 pl-9 focus:border-black bg-gray-200 shadow-inner rounded-lg"/>
        </div>

      {/* Right */}
        <div className="flex items-center justify-between md:w-64">
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
          <div className="relative h-6 w-6 navBtn">
            <UserIcon  />
          </div>
        </div>

      
      </div>
    </div>
  )
}

export default Header