import React from 'react';
import Post from './Post';

const posts = [
  {
    id: '123',
    username: 'priyanshusainimusic',
    userImg: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    img: "https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    caption: 'First Photo on my account!💥'
  }
]

const Posts = () => {
  return (
    <div>
        {posts.map((post)=> (
          <Post 
            key={post.id}
            id={post.id}
            username={post.username}
            userImg={post.userImg}
            img={post.img}
            caption={post.caption}
          />
        
        ))}
    
    </div>
  )
}

export default Posts