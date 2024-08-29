const Like = require("../models/likeModel");

exports.findLike = async (user_id, blog_id) => {
  try {
    return await Like.findOne({ user_id, blog_id });
  } catch (error) {
    console.error("Error finding like:", error);
    throw error;
  }
};

exports.createLike = async (likeData) => {
  try {
    const like = new Like(likeData);
    return await like.save();
  } catch (error) {
    console.error("Error creating like:", error);
    throw error;
  }
};

exports.deleteLike = async (user_id, blog_id) => {
  try {
    return await Like.findOneAndDelete({ user_id, blog_id });
  } catch (error) {
    console.error("Error deleting like:", error);
    throw error;
  }
};

exports.findLikeByBlogAndUser = async (blogId, userId) => {
  const like = await Like.findOne({ blog_id: blogId, user_id: userId });
  return like !== null; // Return true if like exists, false otherwise
};

exports.findLikesByBlogId = async (blogId) => {
  try {
    return await Like.find({ blog_id: blogId });
  } catch (error) {
    console.error("Error finding likes by blog ID:", error);
    throw error;
  }
};

exports.findLikesByUserId = async (userId) => {
  try {
    return await Like.find({ user_id: userId });
  } catch (error) {
    console.error("Error finding likes by user ID:", error);
    throw error;
  }
};
