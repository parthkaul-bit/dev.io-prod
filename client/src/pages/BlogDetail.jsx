import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getBlogInfo } from "../utils/getBlogInfo";
import LikeButton from "../components/LikeButton";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import { useUser } from "../context/UserContext";

function BlogDetail() {
  const [blog, setBlog] = useState(null);
  const { user } = useUser();
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  const fetchComments = async (blogId) => {
    try {
      const { data } = await axios.get(
        "http://dev-io-exl4.onrender.com/api/comments/",
        {
          params: { blog_id: blogId },
        }
      );
      if (Array.isArray(data)) {
        setComments(data);
      } else {
        console.error("Expected an array of comments, but got:", data);
        setComments([]);
      }
    } catch (error) {
      console.error("Error fetching comments", error);
      setComments([]);
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await getBlogInfo(id);
        setBlog(blogData);
        // Fetch comments after fetching the blog
        fetchComments(blogData._id);
      } catch (error) {
        console.error("Failed to fetch blog information", error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleCommentAdded = () => {
    fetchComments(blog._id); // Refetch comments after adding a new one
  };

  if (!blog) {
    return (
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: 4, padding: { xs: 2, sm: 3 } }}>
      <Paper elevation={3} sx={{ padding: { xs: 2, sm: 3 }, borderRadius: 2 }}>
        <Box
          component="img"
          src={blog.image}
          alt={blog.title}
          sx={{
            width: "100%",
            height: { xs: "200px", sm: "300px", md: "400px" },
            objectFit: "cover",
            marginBottom: 3,
            borderRadius: 2,
          }}
        />
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontSize: { xs: "1.8rem", sm: "2.4rem" } }}
        >
          {blog.title}
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          gutterBottom
          sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
        >
          {`By ${blog.author.username} • ${new Date(
            blog.createdAt
          ).toLocaleDateString()}`}
        </Typography>
        <Typography
          variant="body1"
          component="div"
          sx={{
            marginTop: 3,
            fontSize: { xs: "0.9rem", sm: "1rem" },
            overflowX: "auto",
            "& pre": {
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            },
            "& code": {
              backgroundColor: "#f4f4f4",
              color: "#333",
              borderRadius: 1,
              padding: 0.2,
            },
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: blog.body }} />
        </Typography>

        {user?._id && (
          <>
            <LikeButton blogId={blog._id} userId={user._id} />
            <CommentForm
              blogId={blog._id}
              userId={user._id}
              onCommentAdded={handleCommentAdded}
            />
          </>
        )}
        <CommentList comments={comments} />
      </Paper>
    </Container>
  );
}

export default BlogDetail;
