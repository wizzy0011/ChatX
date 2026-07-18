'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface EmailEntryScreenProps {
  onBack: () => void;
  onSubmit: (email: string) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export function EmailEntryScreen({
  onBack,
  onSubmit,
  isLoading,
  error,
}: EmailEntryScreenProps) {
  const [email, setEmail] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!email.trim()) {
      setLocalError('Please enter your email');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setLocalError('Please enter a valid email');
      return;
    }

    await onSubmit(email);
  };

  return (
    <main className="flex flex-col h-screen bg-black max-w-md mx-auto relative">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-700 flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-800 active:bg-slate-700 rounded-full transition-all active:scale-95"
          aria-label="Go back"
        >
          <ArrowLeft size={24} className="text-slate-300" />
        </button>
        <h1 className="text-2xl font-bold text-slate-100">Sign In</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-100 mb-2">
              What's your email?
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              We'll send a 6-digit verification code.
            </p>
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>

          {/* Error Message */}
          {(localError || error) && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{localError || error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending Code...' : 'Send Code'}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="px-6 py-6 border-t border-slate-700 text-center text-slate-400 text-sm">
        <p>No passwords. Just your email and a 6-digit code.</p>
      </div>
    </main>
  );
}
