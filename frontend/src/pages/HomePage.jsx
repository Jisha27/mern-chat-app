import React from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import ChatConatiner from "../components/ChatConatiner";
import NoChatSelected from "../components/NoChatSelected";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  
  return (
    <div className="h-screen bg-base-100 flex  justify-center overflow-hidden">
      <div className=" w-full max-w-6xl h-[80vh] bg-base-200 rounded-xl shadow-lg overflow-hidden flex">
        <Sidebar />

        <div className="flex-1 h-full overflow-hidden">
          {selectedUser ? <ChatConatiner/> : <NoChatSelected />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
