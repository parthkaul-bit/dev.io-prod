import React, { useState } from "react";
import { Grid, Fab, Tooltip } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";
import BlogList from "../components/BlogList";
import TagFilters from "../components/TagFilters";

const Home = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();

  const handleCreateBlog = () => {
    navigate("/blog/create");
  };

  const handleTagChange = (tags) => {
    setSelectedTags(tags);
  };

  return (
    <Grid
      container
      spacing={2}
      direction={{ xs: "column", md: "reverse-column" }}
    >
      {/* Tags Section */}
      <Grid item xs={12} md={4}>
        <TagFilters onTagChange={handleTagChange} />
      </Grid>

      {/* Blog List Section */}
      <Grid item xs={12} md={8}>
        <BlogList selectedTags={selectedTags} />
      </Grid>

      {/* Floating Action Button */}
      {window.localStorage.getItem("token") && (
        <Fab
          aria-label="create"
          onClick={handleCreateBlog}
          sx={{
            position: "fixed",
            bottom: { xs: 12, lg: 64 },
            right: { xs: 12, lg: 128 },
            zIndex: 1,
          }}
        >
          <Tooltip title="create a blog" placement="bottom-start">
            <CreateIcon />
          </Tooltip>
        </Fab>
      )}
    </Grid>
  );
};

export default Home;
