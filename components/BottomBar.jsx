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

const BottomBar = () => {
  return (
    <div className="md:hidden flex items-center  justify-evenly w-screen absolute bottom-0 border-t-2 shadow-sm py-3 ">
        <div className="relative h-6 w-6 bottomBtn">
          <HomeIcon />
        </div>
        <div className="relative h-6 w-6 -inset-y-0.5 bottomBtn">
          <PaperAirplaneIcon className="rotate-45 " />
          <div className="absolute -top-1 text-xs -right-0.5 text-white bg-red-500 w-4 h-4 text-center rounded-full">3</div>
        </div>
        <div className="relative h-6 w-6 bottomBtn">
          <PlusIcon  />
        </div>
        <div className="relative h-6 w-6 bottomBtn">
          <HeartIcon  />
        </div>
        <div className="relative h-6 w-6 bottomBtn">
          <UserIcon  />
        </div>
    </div>
  )
}

export default BottomBar