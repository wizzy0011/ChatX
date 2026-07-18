"use client";

import { Menu } from "lucide-react";

interface ChatHeaderProps {
  onMenuClick: () => void;
}

export function ChatHeader({ onMenuClick }: ChatHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-slate-900 border-b border-slate-700 px-4 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-slate-100">ChatX</h1>
      <button
        onClick={onMenuClick}
        className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-300"
      >
        <Menu size={24} />
      </button>
    </header>
  );
}
