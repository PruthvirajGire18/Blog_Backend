import express from "express"
import Blog from "../models/Blog.js"

export const getAllApprovedBlogsAdmin = async (req, res) => {
  try {
    //admin check

    const blogs = await Blog.find({status:"approved"})
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      blogs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs"
    });
  }
};
export const getAllPendingBlogsAdmin=async(req,res)=>{
    try {
        const blogs=await Blog.find({status:"pending"})
          .populate("user","name email role")
          .sort({createdAt:-1})
        res.status(200).json({
            success:true,
            blogs
        });

    
    } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blogs"
    });
  }
}
export const updateBLogStatusAdmin=async(req,res)=>{
 try {
  const {status}=req.body;
  if(!["approved","rejected"].includes(status)){
    return res.status(400).json({
        success:false,
        message:"Invalid status"
    });
  }
  const {id}=req.params;
  const blog=await Blog.findById(id);
  if(!blog){
    return res.status(404).json({
        success:false,
        message:"Blog not found"
    });
  }
  blog.status=status;
  await blog.save();
  res.status(200).json({
    success:true,
    message:"Blog status updated successfully"
  });
 } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update blog status"
    });
  }
}
