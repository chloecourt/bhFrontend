"use client";
import "./globals.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import UserProvider from "../context/UserContext";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className="bg-red-600">
        <UserProvider>
          <Navbar />
          <main className="flex justify-center items-center mx-auto h-[calc(100%_-_14rem)] w-3/4 p-3">
            {children}
          </main>
          <Footer />
        </UserProvider>
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
