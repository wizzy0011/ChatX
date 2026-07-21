'use client';

import { useState } from 'react';
import { ChevronLeft, Mail } from 'lucide-react';

interface EmailEntryScreenProps {
  onBack: () => void;
  onSubmit: (email: string) => void;
  isLoading: boolean;
  error: string;
}

export function EmailEntryScreen({
  onBack,
  onSubmit,
  isLoading,
  error,
}: EmailEntryScreenProps) {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showError = touched && !isValid && email.length > 0;

  const handleSubmit = () => {
    if (!isValid) {
      setTouched(true);
      return;
    }
    onSubmit(email);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValid && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <div className="h-full flex flex-col bg-black">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="p-2 hover:bg-slate-800 rounded-lg transition-all disabled:opacity-50"
          aria-label="Go back"
        >
          <ChevronLeft size={24} className="text-slate-400" />
        </button>
        <h1 className="text-xl font-semibold text-slate-100">Sign In</h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div>
          <h2 className="text-xl font-semibold text-slate-100 mb-2">
            What's your email?
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            We'll send a 6-digit verification code.
          </p>
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-4 text-slate-500"
              aria-hidden="true"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
              onKeyPress={handleKeyPress}
              placeholder="you@example.com"
              disabled={isLoading}
              className="w-full bg-slate-800 text-slate-100 placeholder-slate-500 border border-slate-700 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
              autoComplete="email"
              autoFocus
            />
          </div>

          {showError && (
            <p className="mt-2 text-xs text-red-400">
              Please enter a valid email address.
            </p>
          )}

          {error && (
            <p className="mt-2 text-xs text-red-400">{error}</p>
          )}
        </div>

        {/* Send Button */}
        <button
          onClick={handleSubmit}
          disabled={!isValid || isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all active:scale-95"
        >
          {isLoading ? 'Sending...' : 'Send Code'}
        </button>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-700">
        <p className="text-xs text-slate-500 text-center">
          No passwords. Just your email and a 6-digit code.
        </p>
      </div>
    </div>
  );
}
