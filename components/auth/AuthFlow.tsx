'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { SplashScreen } from './SplashScreen';
import { WelcomeScreen } from './WelcomeScreen';
import { EmailEntryScreen } from './EmailEntryScreen';
import { OTPVerificationScreen } from './OTPVerificationScreen';
import { LoadingScreen } from './LoadingScreen';

type AuthStep = 'splash' | 'welcome' | 'email' | 'otp' | 'loading';

interface AuthFlowProps {
  children: React.ReactNode;
}

export function AuthFlow({ children }: AuthFlowProps) {
  const { session, isLoading: authLoading, signInWithOtp, verifyOtp } = useAuth();
  const [step, setStep] = useState<AuthStep>('splash');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (session) {
        setStep('loading');
      } else {
        const timer = setTimeout(() => {
          setStep('welcome');
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [authLoading, session]);

  if (authLoading || step === 'loading') {
    return <LoadingScreen />;
  }

  if (session) {
    return <>{children}</>;
  }

  const handleSendOtp = async (emailAddress: string) => {
    setError('');
    setIsLoading(true);

    try {
      const { error: sendError } = await signInWithOtp(emailAddress);

      if (sendError) {
        setError(sendError.message || 'Failed to send code. Please try again.');
        setIsLoading(false);
        return;
      }

      setEmail(emailAddress);
      setStep('otp');
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('[AuthFlow] Send OTP error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (code: string) => {
    setError('');
    setIsLoading(true);

    try {
      const { error: verifyError } = await verifyOtp(email, code);

      if (verifyError) {
        setError(verifyError.message || 'Invalid code. Please try again.');
        setIsLoading(false);
        return;
      }

      setStep('loading');
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('[AuthFlow] Verify OTP error:', err);
      setIsLoading(false);
    }
  };

  switch (step) {
    case 'splash':
      return <SplashScreen />;

    case 'welcome':
      return (
        <WelcomeScreen
          onContinue={() => setStep('email')}
          isLoading={isLoading}
        />
      );

    case 'email':
      return (
        <EmailEntryScreen
          onBack={() => setStep('welcome')}
          onSubmit={handleSendOtp}
          isLoading={isLoading}
          error={error}
        />
      );

    case 'otp':
      return (
        <OTPVerificationScreen
          email={email}
          onBack={() => {
            setStep('email');
            setError('');
            setEmail('');
          }}
          onSubmit={handleVerifyOtp}
          isLoading={isLoading}
          error={error}
        />
      );

    default:
      return <LoadingScreen />;
  }
}
