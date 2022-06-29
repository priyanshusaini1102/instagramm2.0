import type { NextPage } from 'next';
import Head from 'next/head';
import BottomBar from '../components/BottomBar';
import Feed from  '../components/Feed';
import { useSession } from 'next-auth/react';

const Home: NextPage = () => {

  const { data: session } = useSession();

  return (
    <div className=" bg-gray-50 min-h-screen pb-10 ">
      <Head>
        <title>Instagramm2-0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
          {/* Feed */}
          <Feed />
      

    </div>
  )
}

export default Home
