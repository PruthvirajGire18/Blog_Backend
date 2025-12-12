import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blog_images",
    allowed_formats: ["jpeg", "png", "jpg"],
  },
});

export const upload = multer({ storage });
