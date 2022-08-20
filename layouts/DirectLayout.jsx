
import {useSession} from 'next-auth/react';
import React,{ useEffect } from 'react'
import Sidebar from '../components/Sidebar';

const Layout = ({children}) => {
  const { data : session} = useSession();



  return (
    <div>
        <Sidebar />
      {children}
    </div>
  )
}

export default Layout