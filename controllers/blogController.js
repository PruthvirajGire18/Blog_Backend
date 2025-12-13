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
export const getAllBlogs=async(req,res)=>{
    try {
        const blogs=await Blog.find().populate("user","name email").sort({createdAt:-1});
        return res.status(200).json({blogs});

    } catch (error) {
        console.error("Error fetching blogs:", error);
        return res.status(500).json({message:"Internal server error"});
    }
}
export const getBlogById=async(req,res)=>{
    try {
        const blog=await Blog.findById(req.params.id).populate("user","name email");
        if(!blog){
            return res.status(404).json({message:"Blog not found"});
        }
        return res.status(200).json({blog});
    } catch (error) {
        console.error("Error fetching blog:", error);
        return res.status(500).json({message:"Internal server error"});
    }
}
export const updateBlog=async(req,res)=>{
    const {title,content}=req.body;
    try {
        const blog=await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).json({message:"Blog not found"});
        }
        if(blog.user.toString()!==req.user.id){
            return res.status(403).json({message:"Forbidden"});
        }
        blog.title=title||blog.title;
        blog.content=content||blog.content;
        if(req.file){
            const result=await cloudinary.uploader.upload(req.file.path,{
                folder:"blog_images"
            });
            blog.image=result.secure_url;
        }
        await blog.save();
        return res.status(200).json({message:"Blog updated successfully"});
    } catch (error) {
        console.error("Error updating blog:", error);
        return res.status(500).json({message:"Internal server error"});
    }
}
export const deleteBlog=async(req,res)=>{
    try {
        const blog=await Blog.findById(req.params.id);
        if(!blog){
            return res.status(404).json({message:"Blog not found"});
        }
        if(blog.user.toString()!==req.user.id){
            return res.status(403).json({message:"Forbidden"});
        }   
        await blog.deleteOne();
        return res.status(200).json({message:"Blog deleted successfully"});
    } catch (error) {
        console.error("Error deleting blog:", error);
        return res.status(500).json({message:"Internal server error"});
    }
}