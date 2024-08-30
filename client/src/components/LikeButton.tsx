import React, { useState, useEffect } from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const LikeButton = ({ blogId, userId }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const { data } = await axios.get(
          `https://dev-io-exl4.onrender.com/api/likes/${blogId}`
        );
        setLikesCount(data.likes.length);
      } catch (error) {
        console.error("Failed to fetch likes", error);
      }
    };
    fetchLikes();
  }, [blogId]);

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const { data } = await axios.get(
          `https://dev-io-exl4.onrender.com/api/likes/status`,
          {
            params: { blog_id: blogId, user_id: userId },
          }
        );
        setLiked(data.liked);
      } catch (error) {
        console.error("Error checking like status", error);
      }
    };
    checkLikeStatus();
  }, [blogId, userId]);

  const handleLike = async () => {
    try {
      const requestConfig = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { blog_id: blogId, user_id: userId },
      };

      if (liked) {
        await axios.delete(
          `https://dev-io-exl4.onrender.com/api/likes/`,
          requestConfig
        );
        setLikesCount((prev) => prev - 1);
      } else {
        await axios.post(
          `https://dev-io-exl4.onrender.com/api/likes/`,
          { blog_id: blogId, user_id: userId },
          requestConfig
        );
        setLikesCount((prev) => prev + 1);
      }
      setLiked(!liked);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300); // Reset animation state
    } catch (error) {
      console.error("Error liking/unliking blog", error);
    }
  };

  // Inline styles for the heart icon
  const heartIconStyles = {
    transition: "transform 0.2s ease-in-out, color 0.2s ease-in-out",
    transform: animate ? "scale(1.3)" : "scale(1)",
    color: liked ? "red" : "inherit",
  };

  return (
    <div>
      <IconButton onClick={handleLike} style={heartIconStyles}>
        <FavoriteIcon />
      </IconButton>
      <span>{likesCount}</span>
    </div>
  );
};

export default LikeButton;
