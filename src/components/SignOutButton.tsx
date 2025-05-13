"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      type="button"
      className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition mt-4"
      onClick={() => signOut({ callbackUrl: "/auth/signin" })}
    >
      Sign out
    </button>
  );
} 