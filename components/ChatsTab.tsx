"use client";

import { useChats } from "@/lib/use-data";
import { ChatItem } from "./ChatItem";

interface ChatsTabProps {
  filter: string;
}

export function ChatsTab({ filter }: ChatsTabProps) {
  const { chats, loading } = useChats();

  const getFilteredChats = () => {
    switch (filter) {
      case "Unread":
        return chats.filter((chat) => chat.unread > 0);
      case "Favorites":
        return chats.filter((chat) => chat.isPinned);
      case "Groups":
        return chats.filter((chat) => chat.isGroup);
      default:
        return chats;
    }
  };

  const filteredChats = getFilteredChats();

  return (
    <div className="flex-1 overflow-y-auto">
      {loading ? (
        <div className="flex items-center justify-center h-full text-slate-400">
          <p>Loading chats...</p>
        </div>
      ) : filteredChats.length > 0 ? (
        filteredChats.map((chat) => <ChatItem key={chat.id} chat={chat} />)
      ) : (
        <div className="flex items-center justify-center h-full text-slate-400">
          <p className="text-center">No {filter.toLowerCase()} chats</p>
        </div>
      )}
    </div>
  );
}
