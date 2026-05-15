import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import chatImg from "../assets/chat2.jpg";


const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore()

  return (
    <div className="w-full bg-base-200 p-3 pb-1 border-b border-base-300">
      <div className="flex">
        <img src={selectedUser.profilePic || chatImg} className="size-10 rounded-full" />
        <span className="flex flex-col text-primary ml-5">
          <span className="font-bold">{selectedUser.fullName}</span>
          <span className="text-neutral/70">{onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}</span>
        </span>
      </div>
    </div>
  );
};

export default ChatHeader;
