import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import {signup,login} from "../controllers/authController.js";

dotenv.config();
const router=express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;