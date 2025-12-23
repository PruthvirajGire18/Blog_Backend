import express from "express"
import { getAllApprovedBlogsAdmin, getAllPendingBlogsAdmin, updateBLogStatusAdmin } from "../controllers/adminController.js";
import { authorise as authMiddleware} from "../middlewares/authMiddleware.js";
const router=express.Router();
router.get("/admin/blogs",authMiddleware,getAllApprovedBlogsAdmin)
router.get("/admin/blogs/pending",authMiddleware,getAllPendingBlogsAdmin)
router.put("/admin/blog/:id/status",authMiddleware,updateBLogStatusAdmin)
export default router;