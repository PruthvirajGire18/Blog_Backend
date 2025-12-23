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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, // which user wrote the blog
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"   // 👈 USER blog = pending
    },
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);
