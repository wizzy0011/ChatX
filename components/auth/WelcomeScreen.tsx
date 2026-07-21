'use client';

import { ChevronRight } from 'lucide-react';

interface WelcomeScreenProps {
  onContinue: () => void;
  isLoading: boolean;
}

export function WelcomeScreen({ onContinue, isLoading }: WelcomeScreenProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 py-8 bg-black">
      {/* Logo/Title */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-100 mb-2">ChatX</h1>
        <p className="text-slate-400 text-sm">Connect. Chat. Share.</p>
      </div>

      {/* Welcome Message */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold text-slate-100 mb-4">
          Welcome to ChatX
        </h2>
        <p className="text-slate-400 max-w-xs">
          Sign in with your email to get started. We'll send you a 6-digit code to verify your identity.
        </p>
      </div>

      {/* Get Started Button */}
      <button
        onClick={onContinue}
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 mb-4"
      >
        Get Started
        <ChevronRight size={20} />
      </button>

      {/* Footer */}
      <p className="text-xs text-slate-500 text-center">
        Your email and data are secure with ChatX.
      </p>
    </div>
  );
}
