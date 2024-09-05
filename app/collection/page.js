"use client";

import React, { useState, useEffect } from "react";
import {
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
import { useUser } from "@clerk/nextjs";
import Header from "../components/Header";

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flipped, setFlipped] = useState({});
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (!isLoaded) return;

      if (!isSignedIn || !user) {
        setError("User is not authenticated.");
        setLoading(false);
        return;
      }

      try {
        const currentUserId = user.id;

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
        console.error(err);
        setError("Failed to load flashcards. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [user, isLoaded, isSignedIn]);

  const handleFlip = (index) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "flashcards", id));
      setFlashcards((prev) => prev.filter((flashcard) => flashcard.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete flashcard. Please try again.");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // justifyContent: "center",
          height: "100vh",
        }}
      >
        <Header />
        <CircularProgress sx={{ marginTop: "200px" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Header />
        <Typography
          variant="h4"
          color="error"
          align="center"
          paddingTop="200px"
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
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Header />
        <Typography
          variant="h4"
          align="center"
          color="secondary.main"
          paddingTop="200px"
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
      <Header />
      <Box sx={{ p: 2, pt: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          color="primary.main"
          sx={{ mb: 4 }}
        >
          Your Flashcard Collection
        </Typography>
        <Grid container spacing={3}>
          {flashcards.map((flashcardSet, setIndex) => (
            <Grid item xs={12} key={flashcardSet.id}>
              <Typography
                variant="h5"
                gutterBottom
                align="center"
                color="secondary.main"
                sx={{ mb: 2 }}
              >
                Topic: {flashcardSet.topic}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(flashcardSet.id)}
                >
                  Delete Topic
                </Button>
              </Box>
              <Grid container spacing={3}>
                {flashcardSet.flashcards &&
                  flashcardSet.flashcards.map((card, cardIndex) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={cardIndex}>
                      <Flashcard
                        card={card}
                        index={`${setIndex}-${cardIndex}`}
                        isFlipped={!!flipped[`${setIndex}-${cardIndex}`]}
                        handleFlip={() =>
                          handleFlip(`${setIndex}-${cardIndex}`)
                        }
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
