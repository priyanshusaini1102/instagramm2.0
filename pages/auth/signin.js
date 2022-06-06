import { getProviders, signIn } from "next-auth/react";
import Header from "../../components/Header";

export default function SignIn({ providers }) {
  return (
    <>
    <Header />
    <div className="w-screen h-screen flex items-center justify-center">
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
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