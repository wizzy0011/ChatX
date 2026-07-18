'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface OTPVerificationScreenProps {
  email: string;
  onBack: () => void;
  onSubmit: (otp: string) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export function OTPVerificationScreen({
  email,
  onBack,
  onSubmit,
  isLoading,
  error,
}: OTPVerificationScreenProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [localError, setLocalError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setLocalError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setLocalError('Please enter all 6 digits');
      return;
    }

    await onSubmit(otpCode);
  };

  const isComplete = otp.every((digit) => digit !== '');

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
        <h1 className="text-2xl font-bold text-slate-100">Verify Email</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-slate-100 mb-2">
              Enter the 6-digit code
            </h2>
            <p className="text-slate-400 text-sm">
              We sent it to <span className="font-medium text-slate-300">{email}</span>
            </p>
          </div>

          {/* OTP Input Fields */}
          <div className="flex gap-3 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-16 bg-slate-800 border border-slate-700 rounded-lg text-center text-2xl font-bold text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                disabled={isLoading}
              />
            ))}
          </div>

          {/* Error Message */}
          {(localError || error) && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{localError || error}</p>
            </div>
          )}

          {/* Verify Button */}
          <button
            type="submit"
            disabled={!isComplete || isLoading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Verifying...' : 'Verify & Sign In'}
          </button>
        </form>

        {/* Resend Code */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            Didn't receive the code?{' '}
            <button
              onClick={onBack}
              className="text-blue-500 hover:text-blue-400 font-medium"
            >
              Try another email
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}
