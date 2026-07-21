'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';

interface OTPVerificationScreenProps {
  email: string;
  onBack: () => void;
  onSubmit: (code: string) => void;
  isLoading: boolean;
  error: string;
}

export function OTPVerificationScreen({
  email,
  onBack,
  onSubmit,
  isLoading,
  error,
}: OTPVerificationScreenProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    
    if (pastedData.length > 0) {
      const newCode = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
      setCode(newCode.slice(0, 6) as string[]);
      
      if (pastedData.length === 6) {
        onSubmit(pastedData);
      }
    }
  };

  const fullCode = code.join('');
  const isComplete = fullCode.length === 6;

  const handleSubmit = () => {
    if (isComplete) {
      onSubmit(fullCode);
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
        <h1 className="text-xl font-semibold text-slate-100">Verify Code</h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-semibold text-slate-100 mb-2">
            Enter the 6-digit code
          </h2>
          <p className="text-slate-400 text-sm">
            We sent a code to <span className="text-slate-300 font-medium">{email}</span>
          </p>
        </div>

        {/* OTP Input Fields */}
        <div className="flex justify-center gap-2 mb-6" onPaste={handlePaste}>
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                if (el) inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleBackspace(index, e)}
              disabled={isLoading}
              className="w-12 h-12 text-center text-2xl font-semibold bg-slate-800 text-slate-100 border-2 border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
              placeholder="-"
              aria-label={`Digit ${index + 1}`}
            />
          ))}
        </div>

        {error && (
          <p className="text-center text-sm text-red-400 mb-6">{error}</p>
        )}

        {/* Verify Button */}
        <button
          onClick={handleSubmit}
          disabled={!isComplete || isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all active:scale-95"
        >
          {isLoading ? 'Verifying...' : 'Verify Code'}
        </button>

        {/* Resend Code */}
        <button
          onClick={onBack}
          disabled={isLoading}
          className="mt-4 text-center text-sm text-slate-400 hover:text-slate-300 disabled:opacity-50"
        >
          Didn't receive a code? Change email
        </button>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-700">
        <p className="text-xs text-slate-500 text-center">
          The code will expire in 15 minutes.
        </p>
      </div>
    </div>
  );
}
