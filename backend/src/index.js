import express from "express"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()
// mongodb connection
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
  console.log("✅ MongoDB Connected");
})
.catch((err) => {
  console.error("❌ DB Connection Error:", err.message);
});
const app = express()

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser()) //parse the cookies
app.use(cors({
  origin : "http://localhost:5173",
  credentials : true
}))
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("Server is running on port "+ PORT);
    
})