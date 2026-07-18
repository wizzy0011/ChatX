"use client";

import { Plus } from "lucide-react";

interface FABProps {
  onClick: () => void;
}

export function FAB({ onClick }: FABProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white flex items-center justify-center shadow-lg transition-all active:scale-90 z-20 max-w-md:bottom-20 font-medium"
      aria-label="Create new chat"
    >
      <Plus size={28} />
    </button>
  );
}
