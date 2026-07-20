"use client";

import { Loader } from "lucide-react";
import Image from "next/image";

interface GoogleSignInScreenProps {
  isLoading: boolean;
  error?: string;
  onSignIn: () => void;
}

export function GoogleSignInScreen({
  isLoading,
  error,
  onSignIn,
}: GoogleSignInScreenProps) {
  return (
    <div className="flex flex-col h-screen bg-black px-6 py-8 justify-between">
      {/* Header */}
      <div />

      {/* Content */}
      <div className="flex flex-col items-center gap-8 mb-12">
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-100 mb-2">ChatX</h1>
          <p className="text-slate-400 text-sm">Connect. Chat. Share.</p>
        </div>

        {/* Description */}
        <div className="text-center max-w-sm">
          <p className="text-slate-300 text-sm leading-relaxed">
            Sign in with your Google account to get started with ChatX
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="w-full bg-red-900/20 border border-red-700 rounded-lg p-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* Sign In Button */}
      <div className="flex flex-col gap-4">
        <button
          onClick={onSignIn}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-700 text-white font-semibold py-3 px-4 rounded-lg transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader size={20} className="animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>Sign in with Google</span>
            </>
          )}
        </button>

        <p className="text-center text-slate-500 text-xs">
          We use Google OAuth to secure your account
        </p>
      </div>
    </div>
  );
}
