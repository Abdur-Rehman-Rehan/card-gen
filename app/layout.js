import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";

export const metadata = {
  title: "Quik Quiz",
  description: "Create flashcard from your text",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <ThemeProvider theme={theme}>
        <html lang="en">
          <body style={{ backgroundColor: "#1E1E2E" }}>
            <div>
              <Toaster />
            </div>
            {children}
          </body>
        </html>
      </ThemeProvider>
    </ClerkProvider>
  );
}
