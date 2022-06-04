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
        {/* Buttons */}
        {/* caption */}
        {/* comments */}
        {/* input box */}
    </div>
  )
}

export default Post