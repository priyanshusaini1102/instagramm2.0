import { getProviders, signIn } from "next-auth/react";
import Head from 'next/head'
import Image from "next/image";


export default function SignIn({ providers }) {
  return (
    <>
    <Head>
      <title>Instagramm2-0</title>
    </Head>
    <div className="w-screen h-screen  flex items-start md:items-center justify-center">
      {Object.values(providers).map((provider) => (
        <div className="h-3/4 flex flex-col space-y-5" key={provider.name}>

          <Image className="m-3" src="/google-3d-logo.png" width="400" height="400" layout="responsive" />
          <button className="border-2 rounded-md border-black text-black hover:bg-black hover:text-white mx-auto text-center p-2" onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  }
}