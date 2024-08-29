const likeService = require("../services/likeService");

exports.likeBlog = async (req, res) => {
  try {
    const { user_id, blog_id } = req.body;
    const like = await likeService.likeBlog(user_id, blog_id);
    res.status(201).json({ message: "Blog liked successfully", like });
  } catch (error) {
    console.error("Error liking blog:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.unlikeBlog = async (req, res) => {
  try {
    const { user_id, blog_id } = req.body;
    await likeService.unlikeBlog(user_id, blog_id);
    res.status(200).json({ message: "Blog unliked successfully" });
  } catch (error) {
    console.error("Error unliking blog:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getLikeStatus = async (req, res) => {
  const { blog_id, user_id } = req.query;

  if (!blog_id || !user_id) {
    return res
      .status(400)
      .json({ message: "Blog ID and user ID are required" });
  }

  try {
    const liked = await likeService.isBlogLikedByUser(blog_id, user_id);
    res.json({ liked });
  } catch (error) {
    console.error("Error checking like status", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllLikesForBlog = async (req, res) => {
  const { blogId } = req.params;

  if (!blogId) {
    return res.status(400).json({ message: "Blog ID is required" });
  }

  try {
    const likes = await likeService.getAllLikesForBlog(blogId);
    res.json({ likes });
  } catch (error) {
    console.error("Error getting likes for blog", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getLikedBlogsByUser = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const likedBlogs = await likeService.getLikedBlogsByUser(userId);
    res.json({ likedBlogs });
  } catch (error) {
    console.error("Error getting liked blogs by user", error);
    res.status(500).json({ message: "Server error" });
  }
};
