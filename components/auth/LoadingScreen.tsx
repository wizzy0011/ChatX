'use client';

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = 'Setting up your ChatX...' }: LoadingScreenProps) {
  return (
    <main className="flex flex-col h-screen bg-black max-w-md mx-auto items-center justify-center relative">
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
          <span className="text-4xl font-bold text-white">X</span>
        </div>

        {/* Loading Animation */}
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-75" />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150" />
        </div>

        {/* Message */}
        <p className="text-slate-400 text-sm text-center max-w-xs">{message}</p>
      </div>
    </main>
  );
}
