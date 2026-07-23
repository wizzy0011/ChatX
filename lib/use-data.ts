"use client";

import { useEffect, useState } from "react";
import {
  getChats,
  getMessages,
  getCommunities,
  getCalls,
  getUpdates,
  createMessage,
  createChat,
  togglePinChat,
} from "./appwrite";
import { useAuth } from "./auth-context";
import { mockChats, mockUpdates, mockCalls, mockCommunities } from "./mockData";

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  isPinned: boolean;
  isGroup: boolean;
}

export interface Message {
  id: string;
  content: string;
  userId: string;
  timestamp: string;
  isOwn?: boolean;
}

export function useChats() {
  const { user, isAuthenticated } = useAuth();
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setChats(mockChats);
      return;
    }

    fetchChats();
  }, [isAuthenticated, user]);

  async function fetchChats() {
    try {
      setLoading(true);
      const data = await getChats(user!.$id);

      if (data.length === 0) {
        setChats(mockChats);
      } else {
        const formattedChats = data.map((chat: any) => ({
          id: chat.$id,
          name: chat.name,
          avatar: chat.name.substring(0, 2).toUpperCase(),
          lastMessage: chat.lastMessage || "No messages yet",
          time: new Date(chat.lastMessageTime || chat.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          unread: 0,
          isPinned: chat.isPinned || false,
          isGroup: chat.isGroup || false,
        }));

        setChats(formattedChats);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
      setChats(mockChats);
    } finally {
      setLoading(false);
    }
  }

  return { chats, loading, refetch: fetchChats };
}

export function useMessages(chatId: string) {
  const { user, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !chatId) return;
    fetchMessages();
  }, [isAuthenticated, chatId, user]);

  async function fetchMessages() {
    try {
      setLoading(true);
      const data = await getMessages(chatId);

      const formattedMessages = data.map((msg: any) => ({
        id: msg.$id,
        content: msg.content,
        userId: msg.userId,
        timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: msg.userId === user?.$id,
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  }

  async function sendMessage(content: string) {
    if (!user || !chatId) return;

    try {
      await createMessage(chatId, user.$id, content);
      await fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }

  return { messages, loading, sendMessage, refetch: fetchMessages };
}

export function useCommunities() {
  const { isAuthenticated } = useAuth();
  const [communities, setCommunities] = useState(mockCommunities);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setCommunities(mockCommunities);
      return;
    }

    fetchCommunities();
  }, [isAuthenticated]);

  async function fetchCommunities() {
    try {
      setLoading(true);
      const data = await getCommunities();

      if (data.length === 0) {
        setCommunities(mockCommunities);
      } else {
        const formatted = data.map((community: any) => ({
          id: community.$id,
          name: community.name,
          members: `${community.members}`,
          description: community.description,
        }));

        setCommunities(formatted);
      }
    } catch (error) {
      console.error("Error fetching communities:", error);
      setCommunities(mockCommunities);
    } finally {
      setLoading(false);
    }
  }

  return { communities, loading, refetch: fetchCommunities };
}

export function useCalls() {
  const { user, isAuthenticated } = useAuth();
  const [calls, setCalls] = useState(mockCalls);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setCalls(mockCalls);
      return;
    }

    fetchCalls();
  }, [isAuthenticated, user]);

  async function fetchCalls() {
    try {
      setLoading(true);
      const data = await getCalls(user!.$id);

      if (data.length === 0) {
        setCalls(mockCalls);
      } else {
        const formatted = data.map((call: any) => ({
          id: call.$id,
          name: call.callerId === user?.$id ? call.recipientId : call.callerId,
          time: new Date(call.createdAt).toLocaleDateString([], {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: call.type,
          duration: call.duration || "0 min",
        }));

        setCalls(formatted);
      }
    } catch (error) {
      console.error("Error fetching calls:", error);
      setCalls(mockCalls);
    } finally {
      setLoading(false);
    }
  }

  return { calls, loading, refetch: fetchCalls };
}

export function useUpdates() {
  const { user, isAuthenticated } = useAuth();
  const [updates, setUpdates] = useState(mockUpdates);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setUpdates(mockUpdates);
      return;
    }

    fetchUpdates();
  }, [isAuthenticated, user]);

  async function fetchUpdates() {
    try {
      setLoading(true);
      const data = await getUpdates(user!.$id);

      if (data.length === 0) {
        setUpdates(mockUpdates);
      } else {
        const formatted = data.map((update: any) => ({
          id: update.$id,
          name: update.userId,
          time: new Date(update.createdAt).toLocaleDateString([], {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          status: update.status,
        }));

        setUpdates(formatted);
      }
    } catch (error) {
      console.error("Error fetching updates:", error);
      setUpdates(mockUpdates);
    } finally {
      setLoading(false);
    }
  }

  return { updates, loading, refetch: fetchUpdates };
}
