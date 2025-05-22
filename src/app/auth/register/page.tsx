"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernamePattern.test(username)) {
      setError("Username must be 3-20 characters, letters, numbers, or underscores only.");
      setLoading(false);
      return;
    }
    if (!acceptedTerms) {
      setError("You must accept the Terms and Conditions to register.");
      setLoading(false);
      return;
    }
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, username, acceptedTerms: true, termsVersion: process.env.TERMS_VERSION || "1.0" }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) {
      setError(data.error);
    } else {
      setSuccess("Registration successful! Redirecting to sign in...");
      setTimeout(() => router.push("/auth/signin"), 1500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Create your account</h1>
        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="p-2 mt-1 block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
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
              className="p-2 mt-1 block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
              autoComplete="new-password"
              required
              className="p-2 mt-1 block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              pattern="^[a-zA-Z0-9_]{3,20}$"
              minLength={3}
              maxLength={20}
              autoComplete="username"
              className="p-2 mt-1 block w-full rounded border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Your username will be used for your public profile link and <strong>cannot be changed later</strong>.
              Only letters, numbers, and underscores. 3-20 characters.
            </p>
          </div>
          <div className="flex items-center">
            <input
              id="acceptedTerms"
              name="acceptedTerms"
              type="checkbox"
              checked={acceptedTerms}
              onChange={e => setAcceptedTerms(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              required
            />
            <label htmlFor="acceptedTerms" className="ml-2 block text-sm text-gray-700">
              I have read and accept the{' '}
              <a href="/terms" className="text-blue-600 hover:underline">Terms and Conditions</a>.
            </label>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="text-center text-sm mt-2">
          Already have an account?{' '}
          <a href="/auth/signin" className="text-blue-600 hover:underline">Sign in</a>
        </div>
      </div>
    </div>
  );
} 