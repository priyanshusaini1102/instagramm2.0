import Header from '../components/Header';
import Modal from '../components/Modal';

import React,{ useEffect } from 'react'

const Layout = ({children}) => {

  
  return (
    <div className="bg-gray-50">
      <Header/>
      <Modal/>
      {children}
    </div>
  )
}

export default Layout