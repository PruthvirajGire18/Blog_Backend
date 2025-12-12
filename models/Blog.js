import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true, 
    },
    author: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    views: {
        type: Number,
        default: 0,
    },

    description: {
        type: String,
        required: true,
    },
      user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
}, { timestamps: true });
export default mongoose.model("Blog", blogSchema);