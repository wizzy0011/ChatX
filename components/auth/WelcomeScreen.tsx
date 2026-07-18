'use client';

interface WelcomeScreenProps {
  onContinue: () => void;
  isLoading?: boolean;
}

export function WelcomeScreen({ onContinue, isLoading }: WelcomeScreenProps) {
  return (
    <main className="flex flex-col h-screen bg-black max-w-md mx-auto relative">
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">X</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white text-center">ChatX</h1>
            <p className="text-slate-400 text-center mt-2">Connect. Chat. Share.</p>
          </div>
        </div>

        {/* Description */}
        <div className="text-center space-y-3">
          <p className="text-slate-300 text-lg">
            Experience secure and instant messaging with end-to-end encryption
          </p>
          <p className="text-slate-400 text-sm">
            Sign in with just your email. No passwords. No hassle.
          </p>
        </div>
      </div>

      {/* Continue Button */}
      <div className="px-6 py-8 border-t border-slate-700">
        <button
          onClick={onContinue}
          disabled={isLoading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Getting Started...' : 'Get Started'}
        </button>
        <p className="text-slate-500 text-xs text-center mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </main>
  );
}
