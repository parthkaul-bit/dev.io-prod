const mongoose = require("mongoose");
const BlogService = require("../services/blogService");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogService.getAllBlogs();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blogId = req.params.blog_id;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ message: "Invalid blog ID" });
    }

    const blog = await BlogService.getBlogById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Error in getBlogById controller:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, image, body, author, tags } = req.body;
    const newBlog = await BlogService.createBlog({
      title,
      image,
      body,
      author,
      tags,
    });
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.getUniqueTags = async (req, res) => {
  try {
    const tags = await BlogService.getUniqueTags();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
