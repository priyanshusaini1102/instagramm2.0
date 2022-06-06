import React from 'react';
import Stories from './Stories';
import Posts from './Posts';
import MiniProfile from './MiniProfile';
import Suggestions from './Suggestions';
import { signIn, useSession } from 'next-auth/react';

const Feed = () => {

  const { data : session} = useSession();

  return (
    <main className=" grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto">
        {/* Section */}
        <section className="col-span-2">
            {/* Stories */}
            <Stories /> 
            {/* Posts */}
            <Posts />
        </section>

        {session ? (
          <section className="hidden xl:flex flex-col">
              {/* Mini Profile */}
              <MiniProfile />
              {/* Suggestions */}
              <Suggestions />
          </section>
        ): (
          <div className="h-fit flex flex-col space-y-4 items-center shadow-md p-4">
            <h2 className="font-bold text-lg uppercase">Login Here</h2>
            <button className="relative text-black text-center border-2 border-black p-2 rounded-lg mx-auto"onClick={signIn} >Sign in with Google</button>
          </div>
        )}
        {/* Section */}

    </main>
  )
}

export default Feed;