import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !body || !tags) {
      setError("Please fill in all required fields");
      return;
    }

    // Split tags by commas, trim spaces, and filter out empty strings
    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    if (tagsArray.length === 0) {
      setError("Please provide at least one tag");
      return;
    }

    const blogData = {
      title,
      image,
      body,
      tags: tagsArray,
      author: user,
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      await axios.post(
        "https://dev-io-exl4.onrender.com/api/blogs/",
        blogData,
        config
      );
      navigate("/");
    } catch (err) {
      setError(err.response.data.message || "An error occurred");
      console.log(err);
    }
  };
  return (
    <Container
      maxWidth="lg"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        backgroundColor: "#121212",
        marginTop: 16,
      }}
    >
      <Paper
        style={{
          padding: 20,
          backgroundColor: "#1e1e1e",
          color: "#e0e0e0",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Create a New Blog
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Editor
              apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
              value={body}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "bold italic underline strikethrough | blockquote code | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | hr link | removeformat | charmap | fullscreen | insertfile image media | forecolor backcolor",
                content_style: "body { color: #e0e0e0; background: #1e1e1e; }",
              }}
              onEditorChange={(content) => setBody(content)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <form onSubmit={handleCreateBlog}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={!!error}
                InputLabelProps={{ style: { color: "#e0e0e0" } }}
                InputProps={{ style: { color: "#e0e0e0" } }}
              />
              <TextField
                label="Cover Image URL"
                variant="outlined"
                fullWidth
                margin="normal"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                InputLabelProps={{ style: { color: "#e0e0e0" } }}
                InputProps={{ style: { color: "#e0e0e0" } }}
              />
              <TextField
                label="Tags (comma separated)"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                InputLabelProps={{ style: { color: "#e0e0e0" } }}
                InputProps={{ style: { color: "#e0e0e0" } }}
              />
              {error && (
                <Typography
                  variant="body2"
                  color="error"
                  style={{ marginTop: 8 }}
                >
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: 16 }}
              >
                Create Blog
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CreateBlog;
