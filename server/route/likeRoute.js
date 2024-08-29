const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, likeController.likeBlog);

router.delete("/", authMiddleware, likeController.unlikeBlog);

router.get("/status", likeController.getLikeStatus);

router.get("/:blogId", likeController.getAllLikesForBlog);

router.get("/user/:userId", authMiddleware, likeController.getLikedBlogsByUser);

module.exports = router;
