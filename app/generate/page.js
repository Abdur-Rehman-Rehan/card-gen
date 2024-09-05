"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Grid,
  Box,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import axios from "axios";
import Flashcard from "../components/Flashcard";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import Header from "../components/Header";

export default function GeneratePage() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [error, setError] = useState(null);
  const [flipped, setFlipped] = useState({});
  const theme = useTheme();
  const { user } = useUser();

  const handleInputChange = (e) => {
    setTopic(e.target.value);
  };

  const saveFlashcardsToFirebase = async (flashcards) => {
    try {
      const flashcardSet = {
        topic,
        flashcards,
        userId: user.id, // Add userId to flashcard set
      };
      await addDoc(collection(db, "flashcards"), flashcardSet);
    } catch (err) {
      console.error("Error saving flashcards to Firebase:", err);
      setError("Failed to save flashcards. Please try again.");
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setFlashcards([]);
    try {
      const response = await axios.post("/api/generate", { topic });
      const generatedFlashcards = response.data;
      setFlashcards(generatedFlashcards);
      await saveFlashcardsToFirebase(generatedFlashcards); // Save flashcards to Firebase
    } catch (err) {
      setError("Failed to generate flashcards. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFlip = (index) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <Box>
      {/* NavBar */}
      <Header />

      {/* Main Content */}
      <Box sx={{ padding: "20px", maxWidth: "100%", overflowX: "auto" }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Flashcard Generator
        </Typography>
        <Box sx={{ padding: "20px" }}>
          <TextField
            label="Enter Topic"
            variant="outlined"
            fullWidth
            value={topic}
            onChange={handleInputChange}
            sx={{
              marginBottom: "20px",
              backgroundColor: theme.palette.background.main,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.secondary.main,
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
              "& .MuiInputLabel-root": {
                color: "#fff",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#fff",
              },
            }}
            InputLabelProps={{
              style: { color: "#fff" },
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
              paddingBottom: "20px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerate}
              disabled={loading || !topic}
              sx={{
                minWidth: "150px",
                maxWidth: "288px", // 3 inches ~ 288px
                width: "100%",
                height: "50px",
                fontSize: "16px",
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Generate Flashcards"}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              href="/collection"
              sx={{
                minWidth: "150px",
                maxWidth: "288px",
                width: "100%",
                height: "50px",
                fontSize: "16px",
                marginLeft: "20px", // Add some space between the buttons
              }}
            >
              Show Collection
            </Button>
          </Box>

          {error && (
            <Typography
              color="error"
              align="center"
              sx={{ marginBottom: "20px" }}
            >
              {error}
            </Typography>
          )}

          {flashcards.length > 0 && (
            <Box sx={{ overflowX: "auto" }}>
              <Grid container spacing={3}>
                {flashcards.map((card, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Flashcard
                      card={card}
                      index={index}
                      isFlipped={flipped[index]}
                      handleFlip={handleFlip}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
