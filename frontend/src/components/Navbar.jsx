import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageCircleHeart, Settings, UserPen, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  return (
    <div className="bg-[#FFFDFB] sticky top-0 z-50">
      <header
        className="
          max-w-6xl mx-auto mt-5
          bg-[#FFFDFB]/80
          backdrop-blur-xl
          border border-[#E9DDF3]
          shadow-lg shadow-[#E9DDF3]/40
          rounded-full
          px-8 py-1
          flex items-center justify-between
        "
      >
        <span className="flex gap-2 text-[#5B3B42] bg-gradient-to-b from-[#F2EBFA] to-[#E9DDF8] rounded-full p-2 px-5">
          <MessageCircleHeart className="size-6" />
          {/* <Link className="text-lg font-bold">Jchat</Link> */}
        </span>
        <div className="flex gap-5 ">
          <span className="flex gap-2 text-[#5B3B42]">
            <Settings to="/settings" className="size-4" />
            <Link className="text-sm hidden md:block">Settings</Link>
          </span>

          {authUser ? (
            <>
              <span className="flex gap-2 text-[#5B3B42]">
                <UserPen className="size-4" />
                <Link to="/profile" className="text-sm hidden md:block">
                  Profile
                </Link>
              </span>
              <span className="flex gap-2 text-[#5B3B42]">
                <LogOut className="size-4" />
                <span onClick={logout} className="text-sm cursor-pointer hidden md:block">
                  Logout
                </span>
              </span>
            </>
          ) : (
            <></>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
