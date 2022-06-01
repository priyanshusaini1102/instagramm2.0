import React from 'react';
import Image from 'next/image';
import {
  SearchIcon,
  PlusIcon,
  HeartIcon,
  UserIcon
} from '@heroicons/react/outline';

import { HomeIcon } from '@heroicons/react/solid';

const Header = () => {
  return (
    <div className="border-b-2 w-screen shadow-sm py-3">
      <div className="flex px-6 justify-between max-w-6xl mx-auto">
      {/* Left */}

        <div className="relative hidden lg:inline-grid w-28 h-10  cursor-pointer ">
          <Image layout="fill" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2880px-Instagram_logo.svg.png" />
        </div>
        <div className="relative lg:hidden w-10 h-10 cursor-pointer">
          <Image layout="fill" src="https://links.papareact.com/jjm" />
        </div>

      {/* Middle */}
        <div className="md:flex justify-center hidden px-2 border-2 h-10 my-auto bg-gray-200 shadow-inner rounded-lg ">
          <div className="relative my-auto border-2">
            <SearchIcon className="h-6 w-6 opacity-30" />
          </div>
            <input type="text" placeholder="Search" className="h-full bg-gray-200 focus:outline-none" />

        </div>

      {/* Right */}
      <div className="flex justify-center">

        <div className="relative my-auto mx-3 h-6 w-6">
          <HomeIcon  />
        </div>
        <div className="relative my-auto mx-3 h-5 w-5 text-black contrast-200">
          <Image layout="fill" src="/direct-instagram.png" />
        </div>
        <div className="relative my-auto mx-3 h-6 w-6">
          <PlusIcon  />
        </div>
        <div className="relative my-auto mx-3 h-6 w-6">
          <Image layout="fill" src="/compass.png" />
        </div>
        <div className="relative my-auto mx-3 h-6 w-6">
          <HeartIcon  />
        </div>
        <div className="relative my-auto mx-3 h-6 w-6">
          <UserIcon  />
        </div>
      </div>
      
      
      </div>
    </div>
  )
}

export default Header