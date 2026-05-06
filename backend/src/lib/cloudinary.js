// This file connects your app to Cloudinary using secret keys
// so you can upload and store images/videos easily.
import {v2 as cloudinary} from "cloudinary"

import { config } from "dotenv"

config()

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

export default cloudinary;