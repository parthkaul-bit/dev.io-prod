import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { getCurrentUser } from "../utils/auth";
import { getUserInfo } from "../utils/getUserInfo";

export default function Signup() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validateFields = () => {
    let isValid = true;
    let errors = { username: "", email: "", password: "" };

    if (!username) {
      errors.username = "Username is required.";
      isValid = false;
    }
    if (!email) {
      errors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid.";
      isValid = false;
    }
    if (!password) {
      errors.password = "Password is required.";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateFields()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://dev-io-exl4.onrender.com/api/auth/signup/",
        {
          username,
          email,
          password,
        }
      );

      // Login the user immediately after signup
      const loginResponse = await axios.post(
        "http://dev-io-exl4.onrender.com/api/auth/login/",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", loginResponse.data.token);

      const userId = getCurrentUser();
      const userData = await getUserInfo(userId);
      setUser(userData);

      // Navigate to home page
      navigate("/");
      console.log("Signup and login successful:", response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during signup."
      );
      console.error("Signup error:", err);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: 8 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Join Dev.io
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            error={Boolean(fieldErrors.username)}
            helperText={fieldErrors.username}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={Boolean(fieldErrors.email)}
            helperText={fieldErrors.email}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            error={Boolean(fieldErrors.password)}
            helperText={fieldErrors.password}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Sign Up
          </Button>
          {error && (
            <Typography
              color="error"
              sx={{ marginTop: 2, textAlign: "center" }}
            >
              {error}
            </Typography>
          )}
          <Box sx={{ marginTop: 2, textAlign: "center" }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link
                to="/login"
                variant="body2"
                style={{ color: "inherit", textDecoration: "underline" }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
