"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Arial, sans-serif", // Modern font
  },
  palette: {
    background: {
      default: "#1E1E2E", // Very Dark Desaturated Blue
      paper: "#101026",
    },
    primary: {
      main: "#02f5b8", // Teal
      dark: "#036661", // dark teal
    },
    secondary: {
      main: "#c9264d", // Coral
    },
    text: {
      primary: "#F5F5F5", // Light Gray
      secondary: "#000000", // Black
    },
  },
});

export default theme;
