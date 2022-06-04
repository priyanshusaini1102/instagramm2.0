import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import BottomBar from '../components/BottomBar';
import Feed from  '../components/Feed';

const Home: NextPage = () => {
  return (
    <div className=" bg-gray-50 min-h-screen">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header  */}
      <Header />

      {/* Feed */}
      <Feed />

      {/* Modal */}

      {/* Bottom Bar */}
      <BottomBar />

    </div>
  )
}

export default Home
