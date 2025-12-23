import express from "express";
import dotenv from "dotenv";
import { upload } from "../middlewares/uploadMiddleware.js";
import {createBlog,getAllBlogs,getBlogById,updateBlog,deleteBlog,getAllBlogsOfAllUsers, getBlogsByUser} from "../controllers/blogController.js";
import { authorise as authMiddleware} from "../middlewares/authMiddleware.js";

dotenv.config();
const router=express.Router();
router.post("/create-blog",authMiddleware,upload.single("image"), createBlog);
router.get("/all-blogs", authMiddleware, getAllBlogs);
router.get("/:id", authMiddleware, getBlogById);
router.put("/edit-blog/:id", authMiddleware, upload.single("image"), updateBlog);
router.delete("/delete-blog/:id", authMiddleware, deleteBlog);
router.get("/blogs/all-users", authMiddleware, getAllBlogsOfAllUsers);
router.get("/blogs/user", authMiddleware, getBlogsByUser);
export default router;