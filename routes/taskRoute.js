import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import {create,getAll,deleteTask,update} from "../controllers/taskController.js";

dotenv.config();
const router=express.Router();
router.use(cors());
router.use(express.json());
router.post("/create-tasks",create);
router.get("/get-tasks",getAll);
router.delete("/delete-tasks/:id",deleteTask);
router.put("/update-tasks/:id",update);


export default router;
