"use client";

import { useUser } from "@clerk/nextjs";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Header from "./components/Header";

export default function Home() {
  const theme = useTheme();
  const { isSignedIn } = useUser();
  const router = useRouter();

  const generateFlashcards = () => {
    if (isSignedIn) {
      router.push("/generate");
    } else {
      toast.error("Please Log in to generate flashcards");
    }
  };

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

      <Box sx={{ textAlign: "center", p: 2 }}>
        <Typography
          variant="h2"
          gutterBottom
          sx={{ color: theme.palette.primary.main }}
        >
          Welcome to Card Gen
        </Typography>
        <Typography variant="h4" gutterBottom>
          Your Fast Track to Mastery Starts Here
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={generateFlashcards}
          sx={{ mt: 2, color: theme.palette.text.secondary }}
        >
          Get Started
        </Button>
      </Box>

      <Container
        sx={{
          p: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{ color: theme.palette.primary.main }}
        >
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                border: `2px solid ${theme.palette.primary.main}`,
                borderRadius: 2,
                backgroundColor: "#0F0F1A",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: theme.palette.primary.main }}
              >
                Effortless Text Input
              </Typography>
              <Typography variant="h6">
                Quickly enter your text, and our AI takes care of the rest.
                Turning your notes into flashcards has never been simpler.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                border: `2px solid ${theme.palette.primary.main}`,
                borderRadius: 2,
                backgroundColor: "#0F0F1A",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: theme.palette.primary.main }}
              >
                Intelligent Flashcards
              </Typography>
              <Typography variant="h6">
                Our AI smartly transforms your text into concise, effective and
                amazing flashcards, designed to maximize your study efficiency.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                border: `2px solid ${theme.palette.primary.main}`,
                borderRadius: 2,
                backgroundColor: "#0F0F1A",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: theme.palette.primary.main }}
              >
                Access From Anywhere
              </Typography>
              <Typography variant="h6">
                Your flashcards are available on any device, anytime. Whether
                you&rsquo;re at home or on the go, your study materials are
                always within reach.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                border: `2px solid ${theme.palette.primary.main}`,
                borderRadius: 2,
                backgroundColor: "#0F0F1A",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: theme.palette.primary.main }}
              >
                Free to Use
              </Typography>
              <Typography variant="h6">
                We believe in providing valuable resources to everyone. Enjoy
                our full range of features at no cost. Optional premium features
                will be available in the future.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
