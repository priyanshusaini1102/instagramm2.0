import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header  */}
      <Header />

      {/* Feed */}

      {/* Modal */}

      <p className='text-2xs text-purple-600'>This is Instagramm2.0💥</p>
    </div>
  )
}

export default Home
