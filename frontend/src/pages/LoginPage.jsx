import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, LockKeyhole, Mail, MessageCircleHeart } from 'lucide-react';
import { Link } from "react-router-dom"
import chatImg from "../assets/chat5.jpg";

const LoginPage = () => {
   const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

    const { login, isLoggingIn} = useAuthStore()
    const handleSubmit = (e) => {
      e.preventDefault()
      login(formData)
    }
  return (
    <div className=" overflow-hidden  grid md:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col  items-center p-6 bg-[#FFFDFB] sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <MessageCircleHeart className="size-4 text-primary" />
              <h1 className="text-xl font-bold mt-2 text-[#5B3B42]">
                Welcome Back
              </h1>

              <p className="text-base-content/60">
                Sign in to your account
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* space-y-6 in Tailwind adds vertical spacing between child elements. */}
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="flex border border-[#E6D9CF] p-2 rounded-xl">
                <Mail className="mr-8 text-[#5B3B42]" />
                <input
                  type="text"
                  placeholder="Enter your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="outline-none focus:outline-none bg-transparent w-full"
                />
              </div>
            </div>
            <div className="form-control">
              {/* In daisyUI
                    , form-control is mainly used as a wrapper container for form elements like:inputs,labels,selects,textareas,checkboxes */}
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="flex justify-between border border-[#E6D9CF] p-2 rounded-xl">
                <LockKeyhole className="mr-8 text-[#5B3B42]" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="************"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="outline-none focus:outline-none bg-transparent w-full"
                />
                {showPassword ? (
                  <Eye
                    className=" text-[#5B3B42] ml-10"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeOff
                    className="text-[#5B3B42] ml-10"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
            <button
              className="bg-gradient-to-r from-[#B78AF7] to-[#9B6EF3] w-full p-3 rounded-xl text-[#FFFDFB] font-semiBold"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Loading..." : "Create Account"}
            </button>
          </form>
          <div>
            Dont have Account?{" "}
            <Link to="/signup">
              <span className="text-[#B78AF7] font-bold ">Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="bg-[#F7F2EC]">
        <img src={chatImg} className="h-full w-full object-cover" />
      </div>
    </div>
  )
}

export default LoginPage