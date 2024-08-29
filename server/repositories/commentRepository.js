const Comment = require("../models/commentModel");

const createComment = async (commentData) => {
  const newComment = new Comment(commentData);
  return await newComment.save();
};

const findCommentsByBlogId = async (blogId) => {
  return Comment.find({ blog_id: blogId });
};

module.exports = {
  createComment,
  findCommentsByBlogId,
};
