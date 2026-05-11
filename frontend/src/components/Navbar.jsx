import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageCircleHeart, Settings, UserPen, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <div className="bg-base-100 sticky top-0 z-50 py-5">
      <header
        className="
          max-w-6xl mx-auto
          bg-base-100/80
          backdrop-blur-xl
          border border-primary/40
          shadow-lg
          rounded-full
          px-8 py-1
          flex items-center justify-between
        "
      >
        <span className="flex gap-2 text-primary bg-base-200 rounded-full p-2 px-5">
          <MessageCircleHeart className="size-6" />
        </span>

        <div className="flex gap-5">
          <span className="flex gap-2 text-base-content">
            <Settings className="size-4" />
            <Link to="/settings" className="text-sm hidden md:block">
              Settings
            </Link>
          </span>

          {authUser && (
            <>
              <span className="flex gap-2 text-base-content">
                <UserPen className="size-4" />
                <Link to="/profile" className="text-sm hidden md:block">
                  Profile
                </Link>
              </span>

              <span className="flex gap-2 text-base-content">
                <LogOut className="size-4" />
                <span
                  onClick={logout}
                  className="text-sm cursor-pointer hidden md:block"
                >
                  Logout
                </span>
              </span>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;