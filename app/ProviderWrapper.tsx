"use client";
import AuthProvider from "../context/AuthContext";
import { SessionProvider } from "next-auth/react";
export default function ProviderssWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  );
}
