'use client';

export function SplashScreen() {
  return (
    <main className="flex flex-col h-screen bg-black max-w-md mx-auto items-center justify-center relative">
      <div className="flex flex-col items-center gap-6">
        {/* ChatX Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">X</span>
          </div>
          <span className="text-3xl font-bold text-white">ChatX</span>
        </div>

        {/* Loading Animation */}
        <div className="flex gap-2 mt-8">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-75" />
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150" />
        </div>

        {/* Loading Text */}
        <p className="text-slate-400 text-sm">Loading ChatX...</p>
      </div>
    </main>
  );
}
