import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";
import chatImg from "../assets/chat2.jpg";
import { formatMessageTime } from "../lib/utils";

const ChatConatiner = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser ,subscribeToMessages,unsubscribeFromMessages } =
    useChatStore();
  const { authUser } = useAuthStore();
  const messageRef = useRef(null)

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages()
    return () => unsubscribeFromMessages()
  }, [selectedUser._id, getMessages,subscribeToMessages,unsubscribeFromMessages]);

//whenever there is new message scroll to latest message
  useEffect(() => {
   if(messageRef.current && messages){
   messageRef.current.scrollIntoView({ behavior : "smooth"})

   } 
  },[messages])
  if (isMessagesLoading) return <span>Loading...</span>;
  return (
    //flex-1 means take all remaining width
    <div className=" flex flex-1 flex-col h-full min-h-0">
      <ChatHeader />
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          return (
            // chat- are daisy ui classes for chat bubble design
            <div
              key={message._id}
              className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"} `}
              ref={messageRef}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || chatImg
                        : selectedUser.profilePic || chatImg
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-[10px] text-neutral/70">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex flex-col">
                {message.image && (
                  <img
                    src={message.image}
                    alt="chat-image"
                    className="sm:max-w-[300px] rounded-md"
                  />
                )}
                {message.text && <span>{message.text}</span>}
              </div>
            </div>
          );
        })}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatConatiner;
