import Header from '../components/Header';
import Modal from '../components/Modal';
import BottomBar from '../components/BottomBar';
import {useSession} from 'next-auth/react';

import React,{ useEffect } from 'react'

const Layout = ({children}) => {
  const { data : session} = useSession();

  
  return (
    <div className="bg-gray-50">
      <Header/>
      <Modal/>
      {session && <BottomBar />}
      {children}
    </div>
  )
}

export default Layout