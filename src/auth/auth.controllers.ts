import  bcrypt from 'bcrypt';
import { generateToken } from '../lib/util';
import { Request, Response } from 'express';
import User from '../models/User.model';

export const SignUp =async (req:Request , res:Response) => {
    const {name , password  ,profileUrl } = req.body;
    try{
      if(!name){
        return res.status(400).json({ message: "No name" });
      }
      if(!password){
        return res.status(400).json({ message: "No password" });
      }
      const userexist = await User.findOne({name});
      if(userexist){
        return res.status(400).json({ message: "User already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        name,
        password: hashedPassword,
        profileUrl
      });
      await newUser.save();
      generateToken(res, newUser._id.toString());
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        profileUrl: newUser.profileUrl,
      });
    }
    catch(error){
      console.error("Error in creating user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  
  
  export const SignIn = async (req:Request , res:Response) => {
    const {name , password } = req.body;
    try{
      if(!name){
        return res.status(400).json({ message: "No name" });
      }
      if(!password){
        return res.status(400).json({ message: "No password" });
      }
      const user = await User.findOne({name});
      if(!user){
        return res.status(400).json({ message: "User does not exist" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
        return res.status(400).json({ message: "Invalid credentials" });
      }
      generateToken(res, user._id.toString());
      res.status(200).json({
        _id: user._id,
        name: user.name,
        profileUrl: user.profileUrl,
      });
    }
    catch(error){
      console.error("Error in signing in user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  
  export const SignOut = (req:Request , res:Response) => {
    try{
      res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(0),
      });
      res.status(200).json({ message: "User signed out successfully" });
    }
    catch(error){
      console.error("Error in signing out user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  
  export const UpdateProfile = async (req: Request, res: Response) => {
  try {
    const authUser = (req as any).user;
    if (!authUser || !authUser._id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { name, profileUrl } = req.body;

    const user = await User.findById(authUser._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) {
      const userByName = await User.findOne({ name });
      if (userByName && userByName._id.toString() !== authUser._id.toString()) {
        return res.status(400).json({ message: 'Name already taken' });
      }
      user.name = name;
    }

    if (profileUrl) user.profileUrl = profileUrl;

    await user.save();

    res.status(200).json({
      _id: user._id,
      name: user.name,
      profileUrl: user.profileUrl,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
