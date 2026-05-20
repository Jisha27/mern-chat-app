import React from 'react'
import { MessageCircleHeart } from "lucide-react";


const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
       <span className="flex gap-2 text-primary bg-base-200 rounded-full p-2 px-5">
          <MessageCircleHeart className="size-6" />
        </span>
      <div className="text-primary text-3xl font-bold">
        Welcome to jchat
      </div>
    </div>
  );
};

export default NoChatSelected;