import express from "express"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors"
import { app , server} from "./lib/socket.js"
import path from "path"

const __dirname = path.resolve()

dotenv.config()
// mongodb connection
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
  console.log("✅ MongoDB Connected");
})
.catch((err) => {
  console.error("❌ DB Connection Error:", err.message);
});


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser()) //parse the cookies
app.use(cors({
  origin : "http://localhost:5173",
  credentials : true
}))
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)
// This code:

// ✅ serves React frontend from Express
// ✅ makes React routes work in production
// ✅ connects frontend + backend into one deployable app
// npm run build
//         ↓
// frontend/dist created
//         ↓
// Express serves dist folder
//         ↓
// App works from one server
if(process.env.NODE_ENV === "prod"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const PORT = process.env.PORT

server.listen(PORT, () => {
    console.log("Server is running on port "+ PORT);
    
})