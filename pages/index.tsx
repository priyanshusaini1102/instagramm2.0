import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import BottomBar from '../components/BottomBar';
import Feed from  '../components/Feed';
import Modal from '../components/Modal';
import { useSession } from 'next-auth/react';
import Layout from '../layouts/Layout';

const Home: NextPage = () => {

  const { data: session } = useSession();

  return (
    <div className=" bg-gray-50 min-h-screen pb-10 ">
      <Head>
        <title>Instagramm2-0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Header  */}
          <>
          {/* Feed */}
          <Feed />

          {/* Modal */}

          {/* Bottom Bar */}
          <BottomBar />
          </>
      

    </div>
  )
}

export default Home
