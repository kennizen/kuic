"use client";

import { Inter } from "next/font/google";
import MainWrapper from "./MainWrapper";
import ThemeProvider from "@/providers/ThemeProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import "remixicon/fonts/remixicon.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="description" content="An WebRTC based peer to peer file transfer application"></meta>
      <title>Kuic</title>
      <body className={inter.className}>
        <ThemeProvider>
          <MainWrapper>{children}</MainWrapper>
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
