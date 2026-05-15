import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import chatImg from "../assets/chat5.jpg";
import { toast } from "react-hot-toast";
import {
  MessageSquare,
  MessageCircleHeart,
  CircleUserRound,
  AtSign,
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");

    if (!formData.password) return toast.error("Password is required");

    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };
  return (
    <div className="h-screen overflow-hidden  grid md:grid-cols-2 bg-base-100 text-base-content">
      {/* left side */}
      <div className="flex flex-col  items-center p-3 bg-base-100">
        <div className="w-full max-w-md space-y-3">
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <MessageCircleHeart className="size-4 text-primary" />
              <h1 className="text-xl font-bold mt-2 text-primary">
                Create Account
              </h1>

              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* space-y-6 in Tailwind adds vertical spacing between child elements. */}
            <div className="form-control">
              {/* In daisyUI
                    , form-control is mainly used as a wrapper container for form elements like:inputs,labels,selects,textareas,checkboxes */}
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="flex border  border-primary/40 bg-base-100 p-2 rounded-xl">
                <CircleUserRound className="mr-8 text-primary" />
                <input
                  type="text"
                  placeholder="Enter your Full Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="outline-none focus:outline-none bg-transparent w-full"
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="flex border  border-primary/40 bg-base-100 p-2 rounded-xl">
                <Mail className="mr-8 text-primary" />
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
              <div className="flex justify-between border  border-primary/40 bg-base-100 p-2 rounded-xl">
                <LockKeyhole className="mr-8 text-primary" />
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
                    className=" text-primary ml-10"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeOff
                    className="text-primary ml-10"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
            <button
              className="btn btn-primary w-full p-3 rounded-xl  font-semiBold"
              disabled={isSigningUp}
            >
              {isSigningUp ? "Loading..." : "Create Account"}
            </button>
          </form>
          <div>
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-primary font-bold ">Log in</span>
            </Link>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="relative bg-base-200">
        <img src={chatImg} className="h-full w-full object-cover" />

        {/* Theme overlay */}
        <div className="absolute inset-0 bg-primary/60"></div>
      </div>
    </div>
  );
};

export default SignupPage;
