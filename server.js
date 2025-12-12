import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import blogRoutes from "./routes/blogRoutes.js";



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // JSON body parse
app.use("/api/auth",authRoutes)
app.use("/api/blogs",blogRoutes)



app.get("/", (req, res) => {
  res.send("hello World from backend");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully 🚀");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.log("DB Connection Failed ❌", err);
  });
