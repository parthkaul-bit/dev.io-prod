import React, { useEffect } from "react";
import CodeIcon from "@mui/icons-material/Code";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { getUserInfo } from "../utils/getUserInfo";
import { getCurrentUser } from "../utils/auth";

const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        const userId = getCurrentUser();
        if (userId) {
          try {
            const userData = await getUserInfo(userId);
            setUser(userData);
          } catch (error) {
            console.error("Failed to fetch user information", error);
          }
        }
      };

      fetchUser();
    }
  }, [user, setUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const isLoginPage = location.pathname === "/login";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CodeIcon />
            <Typography
              variant="overline"
              noWrap
              component="div"
              marginLeft={1}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Dev.io
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          {user ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link
                to="/favorites"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <IconButton
                  size="small"
                  edge="end"
                  aria-label="favorites"
                  color="inherit"
                >
                  <FavoriteIcon />
                </IconButton>
              </Link>
              <img
                src={user.avatar || "/default-avatar.png"}
                alt="Profile"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginLeft: 16,
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  marginLeft: 2,
                  display: { xs: "none", md: "block" },
                }}
              >
                {user.username}
              </Typography>
              <IconButton
                size="large"
                edge="end"
                aria-label="logout"
                aria-haspopup="true"
                color="inherit"
                onClick={handleLogout}
                sx={{ marginLeft: { md: 4 } }}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          ) : (
            !isLoginPage && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography
                    variant="subtitle1"
                    color="inherit"
                    sx={{ marginLeft: 2 }}
                  >
                    Login
                  </Typography>
                </Link>
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography
                    variant="subtitle1"
                    color="inherit"
                    sx={{ marginLeft: 2 }}
                  >
                    Sign Up
                  </Typography>
                </Link>
              </Box>
            )
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
