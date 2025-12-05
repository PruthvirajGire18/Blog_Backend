import dotenv from "dotenv";
import Task from "../models/Task.js";

dotenv.config();

export const create = async (req, res) => {
   const { task } = req.body;

   if (!task || task.trim() === "") {
      return res.status(400).json({ message: "Task is required" });
   }

   try {
      const newTask = await Task.create({ task, completed: false });
      return res.status(201).json(newTask);
   } catch (error) {
      return res.status(500).json({ message: "Server error while creating task" });
   }
};

export const getAll = async (req, res) => {
   try {
      const tasks = await Task.find().sort({ createdAt: -1 });
      return res.status(200).json(tasks);
   } catch (error) {
      return res.status(500).json({ message: "Server error while fetching tasks" });
   }
};

export const update = async (req, res) => {
   const { id } = req.params;

   try {
      const task = await Task.findById(id);

      if (!task) {
         return res.status(404).json({ message: "Task not found" });
      }

      task.completed = !task.completed;
      await task.save();

      return res.status(200).json(task);
   } catch (error) {
      return res.status(500).json({ message: "Server error while updating task" });
   }
};

export const deleteTask = async (req, res) => {
   const { id } = req.params;

   try {
      const task = await Task.findByIdAndDelete(id);

      if (!task) {
         return res.status(404).json({ message: "Task not found" });
      }

      return res.status(200).json(task);
   } catch (error) {
      return res.status(500).json({ message: "Server error while deleting task" });
   }
};
