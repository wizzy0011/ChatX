"use client";

import { mockChats, Chat } from "@/lib/mockData";
import { ChatItem } from "./ChatItem";

interface ChatsTabProps {
  filter: string;
}

export function ChatsTab({ filter }: ChatsTabProps) {
  const getFilteredChats = (): Chat[] => {
    switch (filter) {
      case "Unread":
        return mockChats.filter((chat) => chat.unread > 0);
      case "Favorites":
        return mockChats.filter((chat) => chat.isPinned);
      case "Groups":
        return mockChats.filter((chat) => chat.isGroup);
      default:
        return mockChats;
    }
  };

  const filteredChats = getFilteredChats();

  return (
    <div className="flex-1 overflow-y-auto">
      {filteredChats.length > 0 ? (
        filteredChats.map((chat) => <ChatItem key={chat.id} chat={chat} />)
      ) : (
        <div className="flex items-center justify-center h-full text-slate-400">
          <p className="text-center">No {filter.toLowerCase()} chats</p>
        </div>
      )}
    </div>
  );
}
