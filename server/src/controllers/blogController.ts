import { Request, Response } from "express";
import Blog from "../models/blogModel";

export const createBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      slug,
      category,
      publishedDate,
      author,
      excerpt,
      content,
      tags,
    } = req.body;

    if (
      !title ||
      !slug ||
      !category ||
      !publishedDate ||
      !author ||
      !excerpt ||
      !content ||
      !tags
    ) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const newBlog = new Blog({
      title,
      slug,
      category,
      publishedDate,
      author,
      excerpt,
      content,
      tags,
    });

    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog Created successfully", blog: newBlog });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to create blog", error: error.message });
  }
};

//Get all Blog Controller
export const getAllBlogs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const blogs = await Blog.find().sort({ date: 1 });
    res.status(200).json({ blogs });
  } catch (error: any) {
    console.error("Error fetching events:", error);
    res
      .status(500)
      .json({ message: "Error fetching events", error: error.message });
  }
};

// Get blog by id controller
export const getBlogById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    res.status(200).json({ blog });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching blog", error: error.message });
  }
};

//edit blog controller
export const updateBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBlog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error updating blog", error: error.message });
  }
};

//delete blog controller
export const deleteBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      res.status(404).json({ message: "Blog deleted successfully" });
      return;
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error deleting blog", error: error.message });
  }
};
