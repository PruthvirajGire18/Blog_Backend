import express from "express";
import dotenv from "dotenv";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

dotenv.config();

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            console.log("All fields are required");
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });
        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" },
        )
        res.status(200).json({
            message: "User created successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role:newUser.role
            },
            token
        })

    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Validation
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 2. User exists?
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User does not exist" });
        }

        // 3. Password match?
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 4. Token generate
        const token = jwt.sign(
            { userId: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // 5. Success response
        return res.status(200).json({
            message: "Login successful",
            user: {
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role:existingUser.role
            },
            token,
        });

    } catch (error) {
        console.log("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
