import React, { useState, useEffect } from "react";
import { Typography, List, ListItem, Paper, Box, Avatar } from "@mui/material";
import { formatDistanceToNow } from "date-fns"; // Import date-fns for date formatting
import { getUserInfo } from "../utils/getUserInfo";

const CommentList = ({ comments }) => {
  const [commentsWithUserInfo, setCommentsWithUserInfo] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const updatedComments = await Promise.all(
        comments.map(async (comment) => {
          const userInfo = await getUserInfo(comment.user_id);
          return { ...comment, user: userInfo };
        })
      );
      setCommentsWithUserInfo(updatedComments);
    };

    fetchUserDetails();
  }, [comments]);

  if (commentsWithUserInfo.length === 0) {
    return (
      <Typography variant="h6" align="center" marginTop={4}>
        No comments available
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      <List>
        {commentsWithUserInfo.map((comment) => (
          <ListItem
            key={comment._id}
            alignItems="flex-start"
            sx={{ flexDirection: { xs: "column", sm: "row" }, mb: 2 }}
          >
            <Avatar
              src={comment.user?.avatar}
              alt={comment.user?.username}
              sx={{
                marginRight: 2,
                marginBottom: { xs: 2, sm: 0 },
                alignSelf: "center",
              }}
            />
            <Paper
              elevation={2}
              sx={{
                padding: 2,
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {comment.user?.username}
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ mt: { xs: 1, sm: 0 } }}
                >
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {comment.comment}
              </Typography>
            </Paper>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CommentList;
