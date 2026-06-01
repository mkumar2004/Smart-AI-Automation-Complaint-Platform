"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2, X } from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      // your auth logic here
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white px-8 py-8">
      <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-slate-500 text-center text-sm mb-8">
          Sign in to your account to continue
        </p>

        {/* Error banner */}
        {error && (
          <div className="flex items-center justify-between gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
            <span>{error}</span>
            <button type="button" onClick={() => setError("")}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email
            </label>
            <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-4 h-14 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <svg className="w-5 h-5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                suppressHydrationWarning
                placeholder="Enter your email"
                className="flex-1 outline-none text-sm text-slate-700 placeholder:text-slate-400 bg-transparent"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>
            <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-4 h-14 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <svg className="w-5 h-5 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                suppressHydrationWarning
                placeholder="Enter your password"
                className="flex-1 outline-none text-sm text-slate-700 placeholder:text-slate-400 bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                suppressHydrationWarning
                className="text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 accent-indigo-600"
              />
              <span className="text-sm text-slate-600">Remember me</span>
            </label>
            <button
              type="button"
              suppressHydrationWarning
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            suppressHydrationWarning
            className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-80 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors text-base"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <hr className="flex-1 border-slate-200" />
          <span className="text-xs text-slate-400">or</span>
          <hr className="flex-1 border-slate-200" />
        </div>

        {/* Register */}
        <p className="text-center text-sm text-slate-500">
          New customer?{" "}
          <a href="/Auth/Register" className="text-indigo-600 hover:text-indigo-800 font-semibold">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}