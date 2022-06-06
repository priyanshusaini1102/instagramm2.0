import React,{ useEffect, useState } from 'react';
import faker from 'faker';

const Suggestions = () => {

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() =>{
    const suggestions = [...Array(5)].map((_,i) => (
      {
        ...faker.helpers.contextualCard(),
        id: i,
        img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      }
    ));

    setSuggestions(suggestions);
  }, []);

  return (
    <div className="my-4 p-2 sticky top-52">
      <div className="flex text-sm items-center justify-between" >
        <h3 className=" text-gray-400 ">Suggestions for you</h3>
        <button className="font-semibold">See All</button>
      </div>

      {suggestions.map((profile)=> (
        <div key={profile.id} className="flex items-center justify-between mt-3" >
          <img className="w-10 h-10 object-cover rounded-full border p-[1.5px]" src={profile.img} alt="" />
        
          <div className="flex-1 ml-2">
            <h2 className="font-semibold text-sm">{profile.username}</h2>
            <h3 className="text-xs text-gray-400">{profile.company.name}</h3>
          </div>

          <button className="text-blue-500 text-sm font-semibold">Follow</button>
        </div>
      ))}
    </div>
  )
}

export default Suggestions