import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import chatImg from "../assets/chat2.jpg";
import { Camera } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg,setSelectedImg] = useState(null)

  const handleImageUpload = async (e) => {
    // Get selected file,e.target.files contains all selected files.,files = [photo.jpg]
    // [0] means first file.

    const file = e.target.files[0];
    // If user cancels file selection, function stops.
    if (!file) return;
    // FileReader is a browser feature used to read files.

    // It can convert image files into text/string format.
    const reader = new FileReader();
    // reader.readAsDataURL(file): This converts image into something like:

    // data:image/png;base64,iVBORw0KGgoAAAANS...

    // This is called a Base64 string.

    // Why?
    // Because images cannot directly be sent inside JSON easily.

    // So image becomes text.
    reader.readAsDataURL(file);
    // Reading file takes some time.

    // onload runs after conversion is complete.
    reader.onload = async () => {
      // converted image :const base64Image = reader.result...now it looks like :base64Image = "data:image/png;base64,abcd123..."
      const base64Image = reader.result;
      setSelectedImg(base64Image)
      
      // Send image to backend/store
      await updateProfile({ profilePic: base64Image });
    };
  };
  
  return (
    <div className="bg-base-100 max-w-3xl mx-auto flex flex-col items-center justify-center border border-primary/30 shadow-lg shadow-primary/10 rounded-3xl my-10 p-10 text-base-content">
      <span className="text-2xl font-extrabold text-primary">Profile</span>
      <p className="text-base-content/70">Your profile information</p>
      {/* profile image */}
      <div className="relative p-3">
        <img
          src={selectedImg || authUser?.profilePic || chatImg}
          alt="Profile"
          className="size-32 rounded-full object-cover"
        />
        <label
          htmlFor="avatar-upload"
          className={`absolute bottom-0 right-5 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
        >
          <span className="bg-base-100 size-7 flex rounded-full flex-col items-center justify-center border border-primary">
            <Camera className="w-5 h-5  text-primary" />
          </span>
          <input
            id="avatar-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUpdatingProfile}
          />
        </label>
      </div>
      <p className="text-xs">{isUpdatingProfile ? 'Uploading...' : 'Click camera icon to update profile image'}</p>
      {/* user details */}
      <div className="w-[50%]">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Full Name</span>
          </label>
          <div className="flex border border-primary p-2 rounded-xl">
            <span className="outline-none focus:outline-none bg-transparent w-full">
              {authUser?.fullName}
            </span>
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <div className="flex border border-primary p-2 rounded-xl">
            <span className="outline-none focus:outline-none bg-transparent w-full">
              {authUser?.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

// image upload function
// User selects image
//         ↓
// handleImageUpload runs
//         ↓
// Get file from input
//         ↓
// Convert image → Base64 string
//         ↓
// Send Base64 to updateProfile()
//         ↓
// Backend uploads image
//         ↓
// Profile picture updates
