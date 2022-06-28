import { SearchIcon, PencilAltIcon } from '@heroicons/react/outline';
import { Avatar } from '@mui/material';
import React, { useState } from 'react';
// import styled from 'styled-components';
import ProfileCard from './ProfileCard';
import { useRecoilState } from 'recoil';
import {newChatModalState} from '../atoms/modalAtom';
import ChatModal from './ChatModal';

const Sidebar = () => {
    const [open, setOpen] = useRecoilState(newChatModalState);
    const [chats, setChats] = useState([]);
  return (
        <div className="border-r border-gray-300 w-80 h-full flex-1 ">
            <div className="">
                <div className="relative flex justify-center space-x-3 items-center border-b py-5 border-gray-300 p-2 ">
                    <SearchIcon className="absolute left-9  z-10 h-6 w-6 mr-2"/>
                    <input type="text" className="shadow-inner w-fit h-8 pl-8 p-4 bg-gray-100 rounded-xl" />
                <div>
                    <PencilAltIcon className="h-8 w-8 cursor-pointer" onClick={()=>setOpen(true)} />
                </div>
                </div>
            </div>
            <div className="" >
                <ProfileCard />
                <ProfileCard />
            </div>
            <ChatModal />
        </div>
  )
};

export default Sidebar;

// const Container = styled.div``;

// const Header = styled.div``;

// const UserAvatar = styled(Avatar)``;

// const Users = styled.div``;

// const Search = styled.div``;

// const SearchInput = styled.input`
//     position: relative;
// `;