import React from 'react';
import Image from 'next/image';
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupsIcon,
  HeartIcon,
  Paper
} from '@heroicons/react/outline';

const Header = () => {
  return (
    <div className="border-b-2 w-screen shadow-sm py-4">
      <div className="flex px-2 justify-between">
      {/* Left */}

        <div className="relative hidden lg:inline-grid w-24 h-12 cursor-pointer ">
          <Image layout="fill" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2880px-Instagram_logo.svg.png" />
        </div>
        <div className="relative lg:hidden w-12 h-12 cursor-pointer">
          <Image layout="fill" src="https://links.papareact.com/jjm" />
        </div>

      {/* Middle */}
        <div className="flex justify-center px-2 border-2 h-10 my-auto bg-gray-200 shadow-inner rounded-lg ">
          <div className="relative my-auto border-2">
            <SearchIcon className="h-6 w-6 opacity-30" />
          </div>
            <input type="text" placeholder="Search" className="h-full bg-gray-200 focus:outline-none" />

        </div>

      {/* Right */}
      <div className="flex justify-center">

        <div className="relative flex justify-center h-6 w-6">
          <Image layout="fill" src="/direct-instagram.png" />
        </div>
      </div>
      
      </div>
    </div>
  )
}

export default Header