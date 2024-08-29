const commentService = require("../services/commentService");

exports.createComment = async (req, res) => {
  try {
    const { blog_id, user_id, comment } = req.body;

    if (!blog_id || !user_id || !comment) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newComment = await commentService.createComment(
      blog_id,
      user_id,
      comment
    );

    res
      .status(201)
      .json({ message: "Comment created successfully", comment: newComment });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

exports.getComments = async (req, res) => {
  const { blog_id } = req.query;

  if (!blog_id) {
    return res.status(400).json({ message: "Blog ID is required" });
  }

  try {
    const comments = await commentService.getCommentsByBlogId(blog_id);
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments", error);
    res.status(500).json({ message: "Server error" });
  }
};
