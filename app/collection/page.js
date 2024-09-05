"use client";

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Box, Typography, Grid, CircularProgress, Button } from "@mui/material";
import { db } from "../../firebase";
import Flashcard from "../components/Flashcard";
import { useUser, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Header from "../components/Header";

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flipped, setFlipped] = useState({});
  const { user, isLoaded, isSignedIn } = useUser(); // Access more user properties

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (!isLoaded) {
        // Wait until user data is fully loaded
        return;
      }

      if (!isSignedIn || !user) {
        setError("User is not authenticated.");
        setLoading(false);
        return;
      }

      try {
        const currentUserId = user.id;

        // Create a query to filter flashcards by userId
        const flashcardsQuery = query(
          collection(db, "flashcards"),
          where("userId", "==", currentUserId)
        );

        const querySnapshot = await getDocs(flashcardsQuery);
        const flashcardsData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          flashcardsData.push({ id: doc.id, ...data });
        });
        setFlashcards(flashcardsData);
      } catch (err) {
        console.error(err); // Log the error to the console for debugging
        setError("Failed to load flashcards. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [user, isLoaded, isSignedIn]); // Include user, isLoaded, and isSignedIn in dependency array

  const handleFlip = (index) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "flashcards", id));
      // Remove deleted flashcard from state
      setFlashcards((prev) => prev.filter((flashcard) => flashcard.id !== id));
    } catch (err) {
      console.error(err); // Log the error to the console for debugging
      setError("Failed to delete flashcard. Please try again.");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Box>
          <Header />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "200px",
          }}
        >
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Header />
        <Typography
          variant="h4"
          color="error"
          align="center"
          sx={{ marginTop: "200px" }}
        >
          {error}
        </Typography>
      </Box>
    );
  }

  if (flashcards.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Header />
        <Typography
          variant="h4"
          align="center"
          sx={{ marginTop: "200px", color: "secondary.main" }}
        >
          No flashcards found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        maxWidth: "100%",
        overflowX: "auto",
      }}
    >
      <Box>
        <Header />
      </Box>
      <Box sx={{ p: 20, paddingTop: "20px" }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          color="primary.main"
        >
          Your Flashcard Collection
        </Typography>
        <Grid container spacing={3}>
          {flashcards.map((flashcardSet, setIndex) => (
            <Grid item xs={12} key={flashcardSet.id}>
              <Typography
                variant="h4"
                gutterBottom
                align="center"
                paddingTop="50px"
                color="secondary.main"
              >
                Topic: {flashcardSet.topic}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "5px",
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(flashcardSet.id)}
                  sx={{
                    marginBottom: "10px",
                  }}
                >
                  Delete Topic
                </Button>
              </Box>
              <Grid container spacing={3}>
                {flashcardSet.flashcards &&
                  flashcardSet.flashcards.map((card, cardIndex) => (
                    <Grid item xs={12} sm={6} md={3} key={cardIndex}>
                      <Flashcard
                        card={card}
                        index={`${setIndex}-${cardIndex}`} // Use a string template for index
                        isFlipped={!!flipped[`${setIndex}-${cardIndex}`]} // Convert to boolean if needed
                        handleFlip={() =>
                          handleFlip(`${setIndex}-${cardIndex}`)
                        } // Use a string template for index
                      />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
