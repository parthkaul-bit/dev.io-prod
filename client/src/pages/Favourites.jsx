import React, { useEffect, useState } from "react";
import { Paper, Typography, Button, Grid, Box, Avatar } from "@mui/material";
import { useUser } from "../context/UserContext";
import { getBlogInfo } from "../utils/getBlogInfo";
import axios from "axios";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser(); // Use user from context
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return; // Avoid fetching if user is not available

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://dev-io-exl4.onrender.com/api/likes/user/${user._id}`, // Ensure correct endpoint
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const favoriteBlogs = response.data.likedBlogs;
        // Fetch detailed information for each blog
        const detailedFavorites = await Promise.all(
          favoriteBlogs.map(async (blog) => {
            try {
              const blogDetails = await getBlogInfo(blog._id);
              return blogDetails;
            } catch (err) {
              console.error("Failed to fetch blog details", err);
              return null;
            }
          })
        );

        setFavorites(detailedFavorites.filter((blog) => blog)); // Filter out nulls
      } catch (err) {
        setError("Failed to fetch favorite blogs.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]); // Fetch when user data changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Box mx={{ xs: 2, sm: 8, md: 12 }}>
      <Typography
        variant="subtitle1"
        fontSize={{ xs: "20px", md: "24px" }}
        textAlign={"center"}
        gutterBottom
        mt={2}
        mb={2}
      >
        YOUR FAVORITE BLOGS
      </Typography>
      {favorites.length > 0 ? (
        favorites.map((blog) => (
          <Paper
            key={blog._id}
            style={{ padding: "16px", marginBottom: "24px" }}
            elevation={3}
          >
            <Grid container spacing={2}>
              {/* Blog Image */}
              <Grid item xs={12} md={4}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: "200px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </Grid>

              {/* Blog Details */}
              <Grid item xs={12} md={8}>
                <Box>
                  <Typography variant="h5" gutterBottom>
                    {blog.title}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: blog.body.slice(0, 200) + `...`,
                      }}
                    />
                  </Typography>
                </Box>
                {/* Author Info */}
                <Grid
                  container
                  alignItems="center"
                  style={{ marginBottom: "8px" }}
                ></Grid>
                {/* Read More Button */}
                <Link to={`/blog/${blog._id}`}>
                  <Button variant="outlined" color="primary">
                    Read More
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Paper>
        ))
      ) : (
        <Typography variant="body1" textAlign="center" verticalAlign="middle">
          No favorite blogs found.
        </Typography>
      )}
    </Box>
  );
};

export default Favorites;
