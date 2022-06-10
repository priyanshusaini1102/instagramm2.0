import React from 'react';
import faker from 'faker';
import { useEffect, useState } from 'react';
import Story from './Story';
import { useSession } from 'next-auth/react';

const Stories = () => {
    const [suggestions, setSuggestions] = useState([]);
    const {data : session} = useSession();

    useEffect(() =>{
        const suggestions = [...Array(20)].map((_,i) => ({
            ...faker.helpers.contextualCard(),
            id: i,
            image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        }));

        setSuggestions(suggestions);
    }, []);

  return (
    <div className="border mx-5 bg-white rounded-lg shadow-inner p-2 flex flex-row overflow-y-scroll hideScroll">

      {session && (
        <Story img={session.user.image} username={session.user.username} />
      ) }
        
      {suggestions.map(profile => <Story key={profile.id} img={profile.image} username={profile.username} />)}
        
    </div> 
  )
}

export default Stories