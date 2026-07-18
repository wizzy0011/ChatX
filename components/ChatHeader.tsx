"use client";

import { Menu, Search } from "lucide-react";

interface ChatHeaderProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
}

export function ChatHeader({ onMenuClick, onSearchClick }: ChatHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-slate-900 border-b border-slate-700 px-4 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-slate-100">ChatX</h1>
      <div className="flex items-center gap-2">
        <button
          onClick={onSearchClick}
          className="p-2 hover:bg-slate-800 active:bg-slate-700 rounded-full transition-all active:scale-95 text-slate-300 hover:text-slate-100"
          aria-label="Search"
        >
          <Search size={24} />
        </button>
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-slate-800 active:bg-slate-700 rounded-full transition-all active:scale-95 text-slate-300 hover:text-slate-100"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}
