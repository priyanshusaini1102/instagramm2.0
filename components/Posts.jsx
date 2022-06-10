import { onSnapshot, query, collection, orderBy } from 'firebase/firestore';
import React, {useState, useEffect} from 'react';
import Post from './Post';
import { db } from '../firebase';


// const posts = [
//   {
//     id: '123',
//     username: 'priyanshusainimusic',
//     userImg: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     img: "https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     caption: 'First Photo on my account!💥'
//   },
//   {
//     id: '123',
//     username: 'priyanshusainimusic',
//     userImg: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     img: "https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     caption: 'First Photo on my account!💥'
//   }
// ]

const Posts = () => {

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
    <div>
        {posts.map((post)=> (
          <Post 
            key={post.id}
            id={post.id}
            username={post.data().username}
            userImg={post.data().profileImg}
            img={post.data().image}
            caption={post.data().caption}
          />
        
        ))}
    
    </div>
  )
}

export default Posts