import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";

const THEME = createTheme({
  palette: {
    mode: "dark", // Set the mode to dark
    primary: {
      main: "#1976d2", // Customize primary color for dark theme
    },
    secondary: {
      main: "#dc004e", // Customize secondary color for dark theme
    },
    background: {
      default: "#121212", // Dark background color
      paper: "#1d1d1d", // Dark paper color (e.g., for cards)
    },
    text: {
      primary: "#e0e0e0", // Primary text color
      secondary: "#b0b0b0", // Secondary text color
    },
  },
  typography: {
    fontFamily: `"Inter", "Roboto", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={THEME}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
