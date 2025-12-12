import express from "express";
import dotenv from "dotenv";
import {signup,login} from "../controllers/authController.js";

dotenv.config();
const router=express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;