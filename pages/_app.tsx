import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from 'recoil';
import Layout from '../layouts/Layout';
import { useEffect } from 'react';
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {

 
  

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Layout>
       <Component {...pageProps} />
        </Layout>
       </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp;

/*
import { SessionProvider } from "next-auth/react"
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

/*
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
*/
