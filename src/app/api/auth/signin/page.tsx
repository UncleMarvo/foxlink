"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

// Helper to check if a provider is enabled (env vars set)
const googleEnabled = Boolean(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
const githubEnabled = Boolean(process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID);

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle email/password login
  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
    } else if (res?.ok) {
      window.location.href = "/dashboard"; // Redirect on success
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Sign in to your account</h1>
        {/* OAuth Providers */}
        <div className="flex flex-col gap-3">
          {googleEnabled && (
            <button
              className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition"
              onClick={() => signIn("google")}
            >
              Sign in with Google
            </button>
          )}
          {githubEnabled && (
            <button
              className="w-full py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
              onClick={() => signIn("github")}
            >
              Sign in with GitHub
            </button>
          )}
        </div>
        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="mx-2 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>
        {/* Email/Password Form */}
        <form className="space-y-4" onSubmit={handleCredentialsSignIn}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in with Email"}
          </button>
        </form>
        {/* Add a link to registration or password reset here if needed */}
        <div className="text-center text-sm mt-2">
          Don&apos;t have an account?{' '}
          <a href="/auth/register" className="text-blue-600 hover:underline">Register</a>
        </div>
      </div>
    </div>
  );
} 