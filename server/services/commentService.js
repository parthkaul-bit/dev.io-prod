const commentRepository = require("../repositories/commentRepository");
const Blog = require("../models/blogModel");

const createComment = async (blog_id, user_id, comment) => {
  if (!blog_id || !user_id || !comment) {
    throw new Error("All fields are required");
  }

  // Create a new comment
  const commentData = { blog_id, user_id, comment };
  const newComment = await commentRepository.createComment(commentData);

  // Update the blog with the new comment
  await Blog.findByIdAndUpdate(blog_id, {
    $push: { comments: newComment._id },
  });

  return newComment;
};
const getCommentsByBlogId = async (blogId) => {
  return commentRepository.findCommentsByBlogId(blogId);
};

module.exports = {
  createComment,
  getCommentsByBlogId,
};
