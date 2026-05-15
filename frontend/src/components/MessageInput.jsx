import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { X, Image, Send } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessages } = useChatStore();
// User selects image
// ↓
// const file = e.target.files[0]
// ↓
// Check if image
// ↓
// Create FileReader
// ↓
// Read image as Base64
// ↓
// When finished:
// reader.onloadend
// runs
// ↓
// Save into state
// ↓
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if(!file.type.startsWith("image/")){
      toast.error("Please select an Image")
      return
    }

    const reader = new FileReader()
    // Run code after file is fully read
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }

    reader.readAsDataURL(file)
  };

  const removeImage = () => {
    setImagePreview(null)
    if(fileInputRef.current) fileInputRef.current.value = ""
  };
  const handleSendMessage = async (e) => {
    e.preventDefault()
    if(!text.trim() && !imagePreview) return
    try {
      await sendMessages({
        text : text.trim(),
        image : imagePreview
      })
      
      //clear form
      setText("")
      setImagePreview(null)
      if(fileInputRef.current) fileInputRef.current.value = ""
    } catch (error) {
      console.error("failed to send message")
      toast.error(error.response?.data?.message || "Failed to send message")
    }
  };
  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center">
          <div className="relative">
            <img
              src={imagePreview}
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
            >
              <X className="text-primary size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className=" flex rounded-lg ">
        <div className="flex gap-2 w-full  items-center">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message"
            className="w-full h-full p-3 rounded-lg"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
          type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-600" : "text-primary"}`}
          >
            <Image className="s" />
          </button>
          <button
            type="submit"
            className="btn btn-sm btn-circle"
            // trim() removes spaces from beginning and end:
            disabled={!text.trim() && !imagePreview}
          >
            <Send />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
