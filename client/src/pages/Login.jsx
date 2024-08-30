import {
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserInfo } from "../utils/getUserInfo";
import { getCurrentUser } from "../utils/auth";
import { useUser } from "../context/UserContext";

const Login = () => {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://dev-io-exl4.onrender.com/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);

      const userId = getCurrentUser();
      const userData = await getUserInfo(userId);
      setUser(userData);

      navigate("/", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during login."
      );
    }
  };

  return (
    <Container
      maxWidth="xs"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Paper>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom>
            Welcome to Dev.io
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!error}
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
              Login
            </Button>
          </form>
          <Typography variant="body2" align="center" style={{ marginTop: 16 }}>
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              Sign up here
            </Link>
          </Typography>
        </CardContent>
      </Paper>
    </Container>
  );
};

export default Login;
