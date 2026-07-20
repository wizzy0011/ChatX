"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { SplashScreen } from "./SplashScreen";
import { GoogleSignInScreen } from "./GoogleSignInScreen";
import { LoadingScreen } from "./LoadingScreen";

type AuthStep = "splash" | "signin" | "loading";

interface AuthFlowProps {
  children: React.ReactNode;
}

export function AuthFlow({ children }: AuthFlowProps) {
  const { session, isLoading: authLoading, signInWithGoogle } = useAuth();
  const [step, setStep] = useState<AuthStep>("splash");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (session) {
        setStep("loading");
      } else {
        const timer = setTimeout(() => {
          setStep("signin");
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [authLoading, session]);

  if (authLoading || step === "loading") {
    return <LoadingScreen />;
  }

  if (session) {
    return <>{children}</>;
  }

  const handleSignInGoogle = async () => {
    setError("");
    setIsLoading(true);

    try {
      const { error: signInError } = await signInWithGoogle();

      if (signInError) {
        setError(
          signInError.message || "Failed to sign in. Please try again."
        );
        setIsLoading(false);
        return;
      }

      setStep("loading");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("[AuthFlow] Google sign in error:", err);
      setIsLoading(false);
    }
  };

  if (step === "splash") {
    return <SplashScreen />;
  }

  if (step === "signin") {
    return (
      <GoogleSignInScreen
        isLoading={isLoading}
        error={error}
        onSignIn={handleSignInGoogle}
      />
    );
  }

  if (step === "loading") {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
