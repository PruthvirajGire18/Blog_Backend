import express from "express";
import dotenv from "dotenv";
import Blog from "../models/Blog.js";

dotenv.config();
const router=express.Router();

export const createBlog=()=>{
    const {title,content,image, author,description,user}=req.body;
    try {
        if(!title || !content || !image || !author || !description || !user){
            return res.status(400).json({message:"All fields are required"});
        }
    } catch (error) {
        
    }
}