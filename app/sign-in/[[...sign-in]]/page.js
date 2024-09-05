"use client";
import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Header from "../../components/Header";

export default function SignUpPage() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: "100vh",
        fontFamily: theme.typography.fontFamily,
      }}
    >
      <Header />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={4}
      >
        <Typography variant="h4">Sign In</Typography>
        <Box p={4}>
          <SignIn />
        </Box>
      </Box>
    </Box>
  );
}
