import React,{ useEffect, useState, useRef } from 'react';
import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon
} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { collection, serverTimestamp, addDoc, onSnapshot, query, orderBy, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Moment from "react-moment";
import Image from 'next/image';

const Post = ({ id, username, userImg, img, caption }) => {
    const {data: session } = useSession();

    const commentRef = useRef(null);

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [commentBox, setCommentBox] = useState(false);
    const [likes,setLikes] = useState([]);
    const [hasLiked,setHasLiked] = useState(false);

    useEffect(()=> onSnapshot(query(collection(db,'posts',id,'comments'), orderBy('timestamp', 'desc')), snapshot => {
        setComments(snapshot.docs);
    }) , [db,id]);
    
    useEffect(()=> onSnapshot(collection(db,'posts',id,'likes'), snapshot => {
        setLikes(snapshot.docs);
    }) , [db,id]);

    useEffect(()=>{
        setHasLiked(likes.findIndex(like => (like.id === session?.user?.uid)) !== -1);
    },[likes])

    const likePost = async () => {
        if(hasLiked){
            await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
            setHasLiked(false);
        }else{
            await setDoc(doc(db,'posts',id,'likes', session.user.uid), {
                username: session.user.username,
            })
            setHasLiked(true);
        }
    }

    const sendComment = async (e) => {
        e.preventDefault();
        setLoading(true);
        const commentToSend = comment; 
        setComment("");

        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp(),
        })

        setLoading(false);
    }

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
            <img src={img} onDoubleClick={likePost} className="w-full" alt="" />
        </div>
        {session && <div className="flex items-start justify-between px-4 pt-4">
        {/* Buttons */}
            <div className="flex item-center space-x-4">
            <div className="flex flex-col space-y-1 w-9">
                <HeartIcon onClick={likePost} className={`h-6 md:h-7 cursor-pointer ${hasLiked && " transition ease-in-out scale-110 text-red-600 fill-red-600 scale-1"}`} />
                {likes.length>0 && <p className="text-sm font-semibold whitespace-nowrap">{likes.length} {likes.length > 1 ? "likes" : "like"}</p>}
            </div>
            <ChatIcon onClick={()=> commentRef.current.focus()} className="h-6 w-9 md:h-7" />
            <PaperAirplaneIcon className="relative h-6 w-9 md:h-7 rotate-45 -inset-y-0.5 inset-x-0.5" />
            </div>
            <BookmarkIcon className="h-6 w-9  md:h-7 hover:fill-black" />        
        </div>}
        <div className="px-4 mt-2 py-2">
        {/* caption */}
            <p>
                <span className="font-bold">{username} </span>
                <span className=" font-sans font-semibold">{caption}</span>
            </p>
        </div>
        
        {/* comments */}
        {comments && <div className="mt-2">
        <div className="flex justify-between px-5 font-semibold text-gray-400">
            <p>{comments.length} Comments</p>
            {comments.length==0 && "Be the first person to comment!❤️‍🔥"}
            <button className="hover:text-black" onClick={()=>commentBox ? setCommentBox(false) : setCommentBox(true)}>View {commentBox ? "Less" :"All"}</button>
        </div>
        {comments.length>0 && <div className={`px-6 py-2 mb-0 ${commentBox ? "h-full" : "max-h-20"}  shadow-inner scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-50 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full`}>
            {comments.map((i)=>(
            <div key={i.id} className="flex items-center text-sm justify-between m-1">
                <div className="flex items-center space-x-2">
                <img className="h-6 w-6 rounded-full" src={i.data().userImage} alt="" />
                <span className="font-bold">{i.data().username} </span>
                <span className="font-sans">{i.data().comment}</span> 
                </div>
                <div className="flex items-center space-x-3">
                <Moment className="text-xs capitalize font-semibold text-gray-400" fromNow>{i.data().timestamp?.toDate()}</Moment>
                <HeartIcon className="h-5 hover:fill-red-500 hover:text-red-500" />
                </div>
            </div>
            ))}
            </div>}
        </div>}
        {session && <form onSubmit={sendComment} className="flex items-center p-4 border-t border-gray-300">
        {/* input box */}
            <EmojiHappyIcon className="h-8" />
            <input ref={commentRef} onChange={(e)=> setComment(e.target.value)} type="text" value={comment} placeholder="Add a comment..." className="flex-1 px-4 focus:outline-none" />
            <button type="submit" disabled={!(comment.trim())} className={`${(!comment.trim() ? "text-blue-200 ": "text-blue-600")} font-bold text-lg`}>{loading ? "Posting..." : "Post"}</button>
        </form>}
    </div>
  )
}

export default Post