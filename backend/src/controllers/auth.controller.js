import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup = async(req,res) => {
  const { fullName , email, password} = req.body  
  try {
    if(!password || password.length < 6){
        return res.status(400).json({message : "Password must be atleast 6 characters"})
    }
    const user = await User.findOne({email})
    if (user) {
        return res.status(400).json({ message: "Email already exists" });
        }
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)    

    const newUser = new User({
        fullName,
        email,
        password : hashedPassword
    })

    if(newUser){
        // generate toke here
        await newUser.save()
        generateToken(newUser._id,res)

        res.status(201).json({
            _id : newUser._id,
            fullName : newUser.fullName,
            email : newUser.email,
            profilePic : newUser.profilePic

        })
    }else{
       return  res.status(400).json({message : "invalid user data"})
    }
  } catch (error) {
    console.log("error in sign up cpontroller",error.message);
    res.status(500).json({message : "Internal Server Error"})
    
  }
}

export const login = (req,res) => {
    res.send("log in route")
}

export const logout = (req,res) => {
    res.send("logout in route")
}