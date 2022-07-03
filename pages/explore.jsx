import React,{ useState, useEffect } from 'react';
import { onSnapshot, query, collection, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import Header from '../components/Header';

const explore = () => {

    const [posts, setPosts] = useState([]);

    useEffect(()=>{
      const unSubscribe = onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
        setPosts(snapshot.docs);
      });
  
      return () => {
        unSubscribe();
      }
  
    },[db]);

    return (
        <>
        <div className="mt-4 min-h-screen max-w-6xl mx-auto border px-auto">

            <div className="flex flex-wrap justify-start md:justify-start border w-fit">
                {posts.map((post)=> (
                    <div className="m-2 md:mx-2  object-cover">
                        <img className="object-cover w-28 h-28 md:w-60 md:h-60 " src={post.data().image} />
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}

export default explore