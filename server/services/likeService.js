const likeRepository = require("../repositories/likeRepository");
const blogRepository = require("../repositories/blogRepository");
const userRepository = require("../repositories/userRepository");

exports.likeBlog = async (user_id, blog_id) => {
  try {
    // Check if the blog and user exist
    const blog = await blogRepository.findBlogById(blog_id);
    const user = await userRepository.findUserById(user_id);

    if (!blog || !user) {
      throw new Error("Blog or User not found");
    }

    // Check if the user has already liked the blog
    const existingLike = await likeRepository.findLike(user_id, blog_id);
    if (existingLike) {
      throw new Error("User has already liked this blog");
    }

    // Create a new like
    const like = await likeRepository.createLike({ user_id, blog_id });

    // Update the blog's likes array
    blog.likes.push(like._id);
    await blog.save();

    return like;
  } catch (error) {
    console.error("Error in like service:", error);
    throw error;
  }
};

exports.unlikeBlog = async (user_id, blog_id) => {
  try {
    // Check if the blog and user exist
    const blog = await blogRepository.findBlogById(blog_id);
    const user = await userRepository.findUserById(user_id);

    if (!blog || !user) {
      throw new Error("Blog or User not found");
    }

    // Delete the like
    const like = await likeRepository.deleteLike(user_id, blog_id);

    if (!like) {
      throw new Error("Like not found");
    }

    // Update the blog's likes array
    blog.likes.pull(like._id);
    await blog.save();

    return like;
  } catch (error) {
    console.error("Error in unlike service:", error);
    throw error;
  }
};

exports.isBlogLikedByUser = async (blogId, userId) => {
  return likeRepository.findLikeByBlogAndUser(blogId, userId);
};

exports.getAllLikesForBlog = async (blogId) => {
  try {
    return await likeRepository.findLikesByBlogId(blogId);
  } catch (error) {
    console.error("Error getting all likes for blog:", error);
    throw error;
  }
};

exports.getLikedBlogsByUser = async (userId) => {
  try {
    const likes = await likeRepository.findLikesByUserId(userId);
    const likedBlogIds = likes.map((like) => like.blog_id);
    return await blogRepository.findBlogsByIds(likedBlogIds);
  } catch (error) {
    console.error("Error getting liked blogs by user:", error);
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
