import React from "react";
import { styled } from "@mui/system";
import { Box, Card, CardContent, Typography } from "@mui/material";

// Styled Components for Flip Animation
const FlipCard = styled(Box)(({ theme }) => ({
  perspective: "1000px",
  width: "100%", // Increased width by 50%
  height: "180px", // Height reverted to original
}));

const FlipCardInner = styled(Box)(({ isFlipped }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  textAlign: "center",
  transition: "transform 0.6s",
  transformStyle: "preserve-3d",
  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
}));

const FlipCardFront = styled(Card)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.secondary.contrastText,
}));

const FlipCardBack = styled(Card)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  backgroundColor: theme.palette.secondary.dark,
  color: theme.palette.secondary.contrastText,
  transform: "rotateY(180deg)",
}));

const Flashcard = ({ card, index, isFlipped, handleFlip }) => {
  return (
    <FlipCard onClick={() => handleFlip(index)}>
      <FlipCardInner isFlipped={isFlipped}>
        <FlipCardFront>
          <CardContent>
            <Typography variant="h6">Question:</Typography>
            <Typography variant="body1">{card.question}</Typography>
          </CardContent>
        </FlipCardFront>
        <FlipCardBack>
          <CardContent>
            <Typography variant="h6">Answer:</Typography>
            <Typography variant="body1">{card.answer}</Typography>
          </CardContent>
        </FlipCardBack>
      </FlipCardInner>
    </FlipCard>
  );
};

export default Flashcard;
