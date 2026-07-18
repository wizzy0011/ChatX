"use client";

import { Pin, Users } from "lucide-react";
import { Chat } from "@/lib/mockData";

interface ChatItemProps {
  chat: Chat;
}

export function ChatItem({ chat }: ChatItemProps) {
  return (
    <div className="px-4 py-3 border-b border-slate-800 hover:bg-slate-900 transition-colors cursor-pointer group">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-semibold text-sm">
            {chat.avatar}
            {chat.isGroup && <Users size={8} className="absolute bottom-0 right-0" />}
          </div>
        </div>

        {/* Chat info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-slate-100 truncate">{chat.name}</h3>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-slate-400">{chat.time}</span>
              {chat.isPinned && (
                <Pin size={14} className="text-slate-400 fill-slate-400" />
              )}
            </div>
          </div>
          <p className="text-sm text-slate-400 truncate mt-1">{chat.lastMessage}</p>
        </div>

        {/* Unread badge */}
        {chat.unread > 0 && (
          <div className="flex-shrink-0">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              {chat.unread}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
