import express from "express";
import dotenv from "dotenv";
import { upload } from "../middlewares/uploadMiddleware.js";
import {createBlog} from "../controllers/blogController.js";

dotenv.config();
const router=express.Router();
router.post("/create-blog",upload.single("image"),createBlog);
export default router;