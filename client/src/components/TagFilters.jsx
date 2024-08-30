import React, { useEffect, useState } from "react";
import { Box, Chip, Typography } from "@mui/material";
import axios from "axios";

const TagFilters = ({ onTagChange }) => {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await axios.get(
          "http://dev-io-exl4.onrender.com/api/blogs/tags"
        );
        setTags(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTags();
  }, []);

  const handleTagClick = (tag) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newSelectedTags);
    onTagChange(newSelectedTags); // Notify parent of tag selection change
  };

  return (
    <>
      <Typography
        variant="subtitle1"
        fontSize={{ xs: "20px", md: "24px" }}
        mt={2}
        textAlign={"center"}
        gutterBottom
      >
        FEATURED BLOGS
      </Typography>
      <Box mx={{ xs: 2, sm: 8, md: 12 }} mt={2} overflow="auto">
        <Box>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onClick={() => handleTagClick(tag)}
              color={selectedTags.includes(tag) ? "primary" : "default"}
              style={{ margin: "4px" }}
              clickable
              size="small"
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default TagFilters;
