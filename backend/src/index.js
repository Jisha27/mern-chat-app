import express from "express"
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv"
import mongoose from "mongoose"

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

app.use(express.json())
app.use("/api/auth",authRoutes)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("Server is running on port "+ PORT);
    
})