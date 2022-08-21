import React from 'react';
import Stories from './Stories';
import Posts from './Posts';
import MiniProfile from './MiniProfile';
import Suggestions from './Suggestions';
import { signIn, useSession } from 'next-auth/react';

const Feed = () => {

  const { data : session} = useSession();

  return (
    <main className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto ${!session && "!grid-cols-1 !max-w-3xl"}`}>
        {/* Section */}
        <section className="col-span-2">
            {/* Stories */}
            {session ? <Stories /> : <p className="text-xs font-semibold text-center text-slate-400">Please Sign In with google to access more functionality. <br/>( Like, Comment, Post & Realtime Messaging )</p>  }
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
          <>
          </>
        )}
        {/* Section */}

    </main>
  )
}

export default Feed;