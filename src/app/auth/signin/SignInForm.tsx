"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// Helper to check if a provider is enabled (env vars set)
const googleEnabled = Boolean(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
const githubEnabled = Boolean(process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID);
const linkedinEnabled = Boolean(process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID);

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");

  let errorMessage = "";
  if (urlError === "OAuthAccountNotLinked") {
    errorMessage =
      "An account already exists with this email address, but it was registered using a different sign-in method. Please sign in using your original method, or contact support if you need help.";
  } else if (urlError) {
    errorMessage = "An error occurred during sign in. Please try again.";
  }

  // Handle email/password login
  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/dashboard", // Always redirect to dashboard after login
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
    } else if (res?.ok) {
      window.location.href = res.url || "/dashboard";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">
          Sign in to your account
        </h1>
        {/* Error message for OAuthAccountNotLinked or other errors */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded text-sm text-center">
            {errorMessage}
          </div>
        )}
        {/* OAuth Providers */}
        <div className="flex flex-col gap-3">
          {googleEnabled && (
            <button
              className="w-full py-2 px-4 bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition flex items-center justify-center gap-2"
              onClick={() => signIn("google")}
            >
              <FcGoogle className="w-5 h-5" />
              <span>Sign in with Google</span>
            </button>
          )}
          {githubEnabled && (
            <button
              className="w-full py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-900 transition flex items-center justify-center gap-2"
              onClick={() => signIn("github")}
            >
              <FaGithub className="w-5 h-5" />
              <span>Sign in with GitHub</span>
            </button>
          )}
          {linkedinEnabled && (
            <button
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center justify-center gap-2"
              onClick={() => signIn("linkedin")}
            >
              <FaLinkedin className="w-5 h-5" />
              <span>Sign in with LinkedIn</span>
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
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="p-2 mt-1 block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="p-2 mt-1 block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          {/* Forgot Password link */}
          <p className="text-center text-sm mt-2">
            <a href="/auth/forgot-password" className="text-blue-600 hover:underline">
              Forgot your password?
            </a>
          </p>
        </form>
        {/* Registration link */}
        <div className="text-center text-sm mt-2">
          Don&apos;t have an account?{" "}
          <a href="/auth/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
} 