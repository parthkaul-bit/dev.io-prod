import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box } from "@mui/material";

const CommentForm = ({ blogId, userId, onCommentAdded }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/comments/", {
        blog_id: blogId,
        comment,
        user_id: userId,
      });
      setComment("");
      onCommentAdded();
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        sx={{ marginBottom: 2 }}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default CommentForm;
