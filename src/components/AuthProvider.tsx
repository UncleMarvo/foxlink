"use client";
import { SessionProvider } from "next-auth/react";

/**
 * AuthProvider - Wraps the app with NextAuth's SessionProvider
 * This enables the useSession hook throughout the app
 */
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
} 