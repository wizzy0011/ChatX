"use client";

import { Client, Account, Databases, Storage, Query } from "appwrite";

// Initialize Appwrite client - only in browser
let _client: Client | null = null;
let _account: Account | null = null;
let _databases: Databases | null = null;
let _storage: Storage | null = null;

function getClient(): Client {
  if (!_client) {
    _client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "")
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "");
  }
  return _client;
}

function getAccount(): Account {
  if (!_account) {
    _account = new Account(getClient());
  }
  return _account;
}

function getDatabases(): Databases {
  if (!_databases) {
    _databases = new Databases(getClient());
  }
  return _databases;
}

function getStorage(): Storage {
  if (!_storage) {
    _storage = new Storage(getClient());
  }
  return _storage;
}

export const account = {
  get: () => getAccount().get(),
  create: (userId: string, email: string, password: string, name?: string) =>
    getAccount().create(userId, email, password, name),
  createEmailPasswordSession: (email: string, password: string) =>
    getAccount().createEmailPasswordSession(email, password),
  deleteSession: (sessionId: string) =>
    getAccount().deleteSession(sessionId),
};

export const databases = {
  listDocuments: (databaseId: string, collectionId: string, queries?: any[]) =>
    getDatabases().listDocuments(databaseId, collectionId, queries),
  getDocument: (databaseId: string, collectionId: string, documentId: string) =>
    getDatabases().getDocument(databaseId, collectionId, documentId),
  createDocument: (databaseId: string, collectionId: string, documentId: string, data: any) =>
    getDatabases().createDocument(databaseId, collectionId, documentId, data),
  updateDocument: (databaseId: string, collectionId: string, documentId: string, data: any) =>
    getDatabases().updateDocument(databaseId, collectionId, documentId, data),
};

export const storage = {
  // Storage methods available for future use
};

// Database and collection IDs
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "chatx_db";
export const COLLECTIONS = {
  USERS: "users",
  CHATS: "chats",
  MESSAGES: "messages",
  PARTICIPANTS: "participants",
  CONTACTS: "contacts",
  COMMUNITIES: "communities",
  CALLS: "calls",
  UPDATES: "updates",
};

export const BUCKETS = {
  AVATARS: "avatars",
  MEDIA: "media",
};

// Helper functions
export async function getUser() {
  try {
    return await account.get();
  } catch (error) {
    return null;
  }
}

export async function loginWithEmail(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw error;
  }
}

export async function registerWithEmail(email: string, password: string, name: string) {
  try {
    const user = await account.create("unique()", email, password, name);

    await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.USERS,
      user.$id,
      {
        name,
        email,
        avatar: name.substring(0, 2).toUpperCase(),
        status: "online",
        createdAt: new Date().toISOString(),
      }
    );

    const session = await account.createEmailPasswordSession(email, password);
    return { user, session };
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
  } catch (error) {
    throw error;
  }
}

export async function getUserProfile(userId: string) {
  try {
    return await databases.getDocument(
      DATABASE_ID,
      COLLECTIONS.USERS,
      userId
    );
  } catch (error) {
    return null;
  }
}

export async function getChats(userId: string) {
  try {
    const chats = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.CHATS,
      [
        Query.or([
          Query.equal("participants", userId),
          Query.equal("createdBy", userId),
        ]),
        Query.orderDesc("updatedAt"),
      ]
    );
    return chats.documents;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return [];
  }
}

export async function getMessages(chatId: string) {
  try {
    const messages = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.MESSAGES,
      [
        Query.equal("chatId", chatId),
        Query.orderAsc("createdAt"),
      ]
    );
    return messages.documents;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
}

export async function createMessage(
  chatId: string,
  userId: string,
  content: string,
  mediaUrl?: string
) {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.MESSAGES,
      "unique()",
      {
        chatId,
        userId,
        content,
        mediaUrl: mediaUrl || null,
        createdAt: new Date().toISOString(),
      }
    );
  } catch (error) {
    throw error;
  }
}

export async function createChat(
  name: string,
  isGroup: boolean,
  createdBy: string,
  participants: string[]
) {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.CHATS,
      "unique()",
      {
        name,
        isGroup,
        createdBy,
        participants: [createdBy, ...participants],
        lastMessage: "",
        lastMessageTime: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );
  } catch (error) {
    throw error;
  }
}

export async function updateChatLastMessage(chatId: string, message: string) {
  try {
    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.CHATS,
      chatId,
      {
        lastMessage: message,
        lastMessageTime: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );
  } catch (error) {
    throw error;
  }
}

export async function togglePinChat(chatId: string, isPinned: boolean) {
  try {
    return await databases.updateDocument(
      DATABASE_ID,
      COLLECTIONS.CHATS,
      chatId,
      {
        isPinned,
      }
    );
  } catch (error) {
    throw error;
  }
}

export async function getCommunities() {
  try {
    const communities = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.COMMUNITIES
    );
    return communities.documents;
  } catch (error) {
    console.error("Error fetching communities:", error);
    return [];
  }
}

export async function getCalls(userId: string) {
  try {
    const calls = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.CALLS,
      [
        Query.or([
          Query.equal("callerId", userId),
          Query.equal("recipientId", userId),
        ]),
        Query.orderDesc("createdAt"),
      ]
    );
    return calls.documents;
  } catch (error) {
    console.error("Error fetching calls:", error);
    return [];
  }
}

export async function getUpdates(userId: string) {
  try {
    const updates = await databases.listDocuments(
      DATABASE_ID,
      COLLECTIONS.UPDATES,
      [
        Query.equal("userId", userId),
        Query.orderDesc("createdAt"),
      ]
    );
    return updates.documents;
  } catch (error) {
    console.error("Error fetching updates:", error);
    return [];
  }
}
