"use client";

import { MessageCircle, TrendingUp, Phone, Users } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "chats", label: "Chats", icon: MessageCircle },
    { id: "updates", label: "Updates", icon: TrendingUp },
    { id: "calls", label: "Calls", icon: Phone },
    { id: "communities", label: "Communities", icon: Users },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-700 bg-slate-900 max-w-md mx-auto">
      <div className="flex items-center justify-around">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center justify-center w-20 py-3 gap-1 transition-all active:scale-90 rounded-lg ${
              activeTab === id
                ? "text-blue-500"
                : "text-slate-400 hover:text-slate-300 hover:bg-slate-800 active:bg-slate-700"
            }`}
            aria-label={`Go to ${label}`}
          >
            <Icon size={24} />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
