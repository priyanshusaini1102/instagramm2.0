import React from 'react';
import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon
} from '@heroicons/react/outline';

const Post = ({ id, username, userImg, img, caption }) => {
  return (
    <div className="bg-white border m-5 rounded-lg  ">
        <div className="flex items-center p-3 border-b rounded-md">
        {/* Header */}
            <img src={userImg} className="rounded-full h-12 w-12 object-cover border mr-3" alt="" />
            <p className="flex-1 font-semibold" >{username}</p>
            <DotsHorizontalIcon className=" h-5" />
        </div>
        <div>
        {/* img */}
            <img src={img} className="w-full" alt="" />
        </div>
        <div className="flex items-center justify-between px-4 pt-4">
        {/* Buttons */}
            <div className="flex item-center space-x-4">
            <HeartIcon className="h-7" />
            <ChatIcon className="h-7" />
            <PaperAirplaneIcon className="h-7" />
            </div>
            <BookmarkIcon className="h-7" />        
        </div>
        <div className="px-4 py-3">
        {/* caption */}
            <p>
                <span className="font-bold">{username} </span>
                <span>{caption}</span>
            </p>
        </div>
        <div>
        {/* comments */}

        </div>
        <div className="flex items-center p-4 border-t border-gray-300">
        {/* input box */}
            <EmojiHappyIcon className="h-8" />
            <input type="text" placeholder="Write a comment! " className="flex-1 px-4" />
            <input type="button" className="text-blue-200 font-bold text-lg" value="Post" />


        </div>
    </div>
  )
}

export default Post