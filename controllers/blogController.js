import express from "express";
import dotenv from "dotenv";
import Blog from "../models/Blog.js";
import cloudinary from "../config/cloudinary.js";

dotenv.config();
const router=express.Router();

export const createBlog=async(req,res)=>{
    const {title,content,user}=req.body;
    try {
        if(!title || !content ){
            return res.status(400).json({message:"All fields are required"});
        }
        if(!req.file){
            return res.status(400).json({message:"Image is required"});
        }
        const result=await cloudinary.uploader.upload(req.file.path,{
            folder:"blog_images"
        });
        const newBlog=new Blog({
            title,
            image:result.secure_url,
            content,
            user:req.user.id,
        });
        await newBlog.save();
        return res.status(201).json({message:"Blog created successfully"});
    } catch (error) {
        console.error("Error creating blog:", error);
        return res.status(500).json({message:"Internal server error"});
    }
}