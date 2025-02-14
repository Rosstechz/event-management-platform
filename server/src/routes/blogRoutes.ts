import { Router } from "express";
import { verifyAdmin } from "../middleware/authMiddleware";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../controllers/blogController";

const router = Router();

//create blog (Admin routes)
router.post("/create", verifyAdmin, createBlog);
// update blog
router.put("/:id", verifyAdmin, updateBlog);
// delete blog
router.delete("/:id", verifyAdmin, deleteBlog);

//(User routes)
//get all blogs
router.get("/", getAllBlogs);
// Get Blog by Id
router.get("/:id", getBlogById);

export default router;
