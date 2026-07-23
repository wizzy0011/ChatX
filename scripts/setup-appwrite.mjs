#!/usr/bin/env node

import { Client, Databases, Collections, AttributeType, PermissionType } from "appwrite";

const endpoint = process.env.APPWRITE_ENDPOINT;
const projectId = process.env.APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;

if (!endpoint || !projectId || !apiKey) {
  console.error("Missing required environment variables:");
  console.error("- APPWRITE_ENDPOINT");
  console.error("- APPWRITE_PROJECT_ID");
  console.error("- APPWRITE_API_KEY");
  process.exit(1);
}

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setKey(apiKey);

const databases = new Databases(client);
const DATABASE_ID = "chatx_db";

const COLLECTIONS = {
  USERS: "users",
  CHATS: "chats",
  MESSAGES: "messages",
  PARTICIPANTS: "participants",
  CONTACTS: "contacts",
  COMMUNITIES: "communities",
  CALLS: "calls",
  UPDATES: "updates",
};

async function setupAppwrite() {
  try {
    console.log("Setting up Appwrite for ChatX...");

    // Create database
    try {
      await databases.create(DATABASE_ID, "ChatX Database");
      console.log("✓ Database created:", DATABASE_ID);
    } catch (error) {
      if (error.code !== 409) {
        throw error;
      }
      console.log("✓ Database already exists:", DATABASE_ID);
    }

    // Create Users collection
    try {
      await databases.createCollection(DATABASE_ID, COLLECTIONS.USERS, COLLECTIONS.USERS, []);
      console.log("✓ Users collection created");

      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.USERS,
        "name",
        255,
        true
      );
      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.USERS,
        "email",
        255,
        true
      );
      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.USERS,
        "avatar",
        50,
        true
      );
      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.USERS,
        "status",
        50,
        true,
        "online"
      );
      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.USERS,
        "createdAt",
        255,
        true
      );
    } catch (error) {
      if (error.code !== 409) {
        console.log("Users collection setup error:", error.message);
      }
    }

    // Create Chats collection
    try {
      await databases.createCollection(DATABASE_ID, COLLECTIONS.CHATS, COLLECTIONS.CHATS, []);
      console.log("✓ Chats collection created");

      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.CHATS,
        "name",
        255,
        true
      );
      await databases.createBooleanAttribute(
        DATABASE_ID,
        COLLECTIONS.CHATS,
        "isGroup",
        true,
        false
      );
      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.CHATS,
        "createdBy",
        255,
        true
      );
      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.CHATS,
        "participants",
        255,
        true
      );
      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.CHATS,
        "lastMessage",
        500,
        false
      );
      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.CHATS,
        "lastMessageTime",
        255,
        false
      );
      await databases.createBooleanAttribute(
        DATABASE_ID,
        COLLECTIONS.CHATS,
        "isPinned",
        false,
        false
      );
      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.CHATS,
        "createdAt",
        255,
        true
      );
      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.CHATS,
        "updatedAt",
        255,
        true
      );
    } catch (error) {
      if (error.code !== 409) {
        console.log("Chats collection setup error:", error.message);
      }
    }

    // Create Messages collection
    try {
      await databases.createCollection(DATABASE_ID, COLLECTIONS.MESSAGES, COLLECTIONS.MESSAGES, []);
      console.log("✓ Messages collection created");

      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.MESSAGES,
        "chatId",
        255,
        true
      );
      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.MESSAGES,
        "userId",
        255,
        true
      );
      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.MESSAGES,
        "content",
        2000,
        true
      );
      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.MESSAGES,
        "mediaUrl",
        500,
        false
      );
      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.MESSAGES,
        "createdAt",
        255,
        true
      );
    } catch (error) {
      if (error.code !== 409) {
        console.log("Messages collection setup error:", error.message);
      }
    }

    // Create Contacts collection
    try {
      await databases.createCollection(DATABASE_ID, COLLECTIONS.CONTACTS, COLLECTIONS.CONTACTS, []);
      console.log("✓ Contacts collection created");

      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.CONTACTS,
        "userId",
        255,
        true
      );
      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.CONTACTS,
        "contactId",
        255,
        true
      );
      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.CONTACTS,
        "status",
        50,
        true,
        "offline"
      );
    } catch (error) {
      if (error.code !== 409) {
        console.log("Contacts collection setup error:", error.message);
      }
    }

    // Create Communities collection
    try {
      await databases.createCollection(DATABASE_ID, COLLECTIONS.COMMUNITIES, COLLECTIONS.COMMUNITIES, []);
      console.log("✓ Communities collection created");

      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.COMMUNITIES,
        "name",
        255,
        true
      );
      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.COMMUNITIES,
        "description",
        1000,
        true
      );
      await databases.createIntegerAttribute(
        DATABASE_ID,
        COLLECTIONS.COMMUNITIES,
        "members",
        true,
        0
      );
      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.COMMUNITIES,
        "avatar",
        50,
        true
      );
    } catch (error) {
      if (error.code !== 409) {
        console.log("Communities collection setup error:", error.message);
      }
    }

    // Create Calls collection
    try {
      await databases.createCollection(DATABASE_ID, COLLECTIONS.CALLS, COLLECTIONS.CALLS, []);
      console.log("✓ Calls collection created");

      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.CALLS,
        "callerId",
        255,
        true
      );
      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.CALLS,
        "recipientId",
        255,
        true
      );
      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.CALLS,
        "type",
        50,
        true
      );
      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.CALLS,
        "duration",
        50,
        false
      );
      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.CALLS,
        "createdAt",
        255,
        true
      );
    } catch (error) {
      if (error.code !== 409) {
        console.log("Calls collection setup error:", error.message);
      }
    }

    // Create Updates collection
    try {
      await databases.createCollection(DATABASE_ID, COLLECTIONS.UPDATES, COLLECTIONS.UPDATES, []);
      console.log("✓ Updates collection created");

      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.UPDATES,
        "userId",
        255,
        true
      );
      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.UPDATES,
        "status",
        255,
        true
      );
      await databases.createStringAttribute(
        DATABASE_ID,
        COLLECTIONS.UPDATES,
        "createdAt",
        255,
        true
      );
    } catch (error) {
      if (error.code !== 409) {
        console.log("Updates collection setup error:", error.message);
      }
    }

    console.log("✓ Appwrite setup completed successfully!");
  } catch (error) {
    console.error("Error setting up Appwrite:", error.message);
    process.exit(1);
  }
}

setupAppwrite();
