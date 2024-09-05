// app/components/Header.js
"use client";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      <Toolbar>
        <Typography
          variant="h3"
          sx={{
            flexGrow: 1,
            textAlign: "left",
            color: theme.palette.primary.main,
          }}
        >
          <Link
            href="/"
            passHref
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Card Gen
          </Link>
        </Typography>
        <SignedOut>
          <Button href="/sign-in" sx={{ color: theme.palette.text.primary }}>
            <Typography variant="h5">Log In</Typography>
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
