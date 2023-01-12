"use client";
import { Inter as FontSans } from "@next/font/google";
import "./globals.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

import ProviderssWrapper from "./ProviderWrapper";
import { cn } from "../utils/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={cn("bg-red-600", "h-full", fontSans.variable)}>
      <head />
      <body className="bg-red-600 min-h-screen flex flex-col">
        <ProviderssWrapper>
          <Navbar />
          <main data-testid="main" className="flex flex-col">
            {children}
          </main>
          <Footer />
        </ProviderssWrapper>
      </body>
    </html>
  );
}

/**
 how strapi next tutorial set up layout page 
<main className="px-4">
  <div
    className="flex justify-center items-center bg-white mx-auto w-2/4 rounded-lg my-16 p-16">
      <div className="text-2xl font-medium" >{children}</div>"
 */
