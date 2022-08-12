import React from 'react'

const Message = ({ user, message, recipientEmail, senderEmail }) => {
  const isRecipient = recipientEmail == senderEmail
  return (
    <>
      {isRecipient ? (
        <div className="flex items-end  ">
          <img src={user} alt="" className="h-6 w-6 rounded-full" />
          <div className="shadow mx-1 font-light rounded-2xl w-fit p-2 my-2">{message}</div>
        </div>
      ) : (
        <div className="flex flex-row-reverse items-end  ">
          <img src={user} alt="" className="h-6 w-6 rounded-full" />
          <div className=" shadow mx-1 bg-gray-100 font-light rounded-2xl w-fit p-2 my-2">{message}</div>
        </div>
      )}
    </>
  )
}

export default Message
