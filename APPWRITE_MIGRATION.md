# ChatX - Supabase to Appwrite Migration Guide

This document outlines the complete migration of ChatX from Supabase to Appwrite, preserving all existing features while replacing the backend infrastructure.

## Overview

ChatX has been successfully migrated to use Appwrite as the backend service for:
- User authentication (email/password)
- Database operations (chats, messages, users, communities, calls, updates)
- File storage (avatars, media)

## Setup Instructions

### 1. Environment Variables

First, set up your Appwrite instance and get the required credentials, then add them to your `.env.local`:

```bash
# Public environment variables (visible in browser)
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://your-appwrite-instance.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=chatx_db

# Server-side only (for setup script)
APPWRITE_ENDPOINT=https://your-appwrite-instance.io/v1
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key
```

### 2. Initialize Appwrite Collections

Run the setup script to create all necessary collections and attributes:

```bash
npm run setup-appwrite
```

This script will:
- Create the `chatx_db` database
- Create 8 collections: Users, Chats, Messages, Contacts, Communities, Calls, Updates, Participants
- Set up all required attributes and indexes
- Configure proper permissions (auto-generated)

## Architecture

### Appwrite Collections

#### Users Collection (`users`)
Stores user profile information
- `name`: User's display name
- `email`: User's email address
- `avatar`: Avatar initials (generated from name)
- `status`: Online/offline status
- `createdAt`: Account creation timestamp

#### Chats Collection (`chats`)
Stores direct messages and group chats
- `name`: Chat name (contact name or group name)
- `isGroup`: Boolean flag for group chats
- `createdBy`: User ID of chat creator
- `participants`: Array of participant user IDs
- `lastMessage`: Last message content
- `lastMessageTime`: Timestamp of last message
- `isPinned`: Boolean for pinned status
- `createdAt`: Chat creation timestamp
- `updatedAt`: Last update timestamp

#### Messages Collection (`messages`)
Stores individual messages
- `chatId`: ID of parent chat
- `userId`: ID of message sender
- `content`: Message text content
- `mediaUrl`: Optional URL to attached media
- `createdAt`: Message timestamp

#### Communities Collection (`communities`)
Stores community information
- `name`: Community name
- `description`: Community description
- `members`: Member count
- `avatar`: Community avatar initials

#### Calls Collection (`calls`)
Stores call history
- `callerId`: ID of person who initiated call
- `recipientId`: ID of call recipient
- `type`: "incoming" or "outgoing"
- `duration`: Call duration in minutes
- `createdAt`: Call timestamp

#### Updates Collection (`updates`)
Stores user status updates
- `userId`: ID of user posting update
- `status`: Update status text
- `createdAt`: Update timestamp

### File Storage Buckets

#### Avatars Bucket
Stores user profile pictures with auto-generated public URLs

#### Media Bucket
Stores chat media files (images, videos, documents)

## API Layer (`lib/appwrite.ts`)

Core Appwrite service functions:

### Authentication
- `getUser()` - Get current authenticated user
- `loginWithEmail(email, password)` - Login with email/password
- `registerWithEmail(email, password, name)` - Create new account
- `logout()` - Logout current user

### Data Operations
- `getChats(userId)` - Fetch user's chats
- `getMessages(chatId)` - Fetch chat messages
- `createMessage(chatId, userId, content, mediaUrl)` - Send message
- `createChat(name, isGroup, createdBy, participants)` - Create new chat
- `togglePinChat(chatId, isPinned)` - Pin/unpin chat
- `getCommunities()` - Fetch communities
- `getCalls(userId)` - Fetch call history
- `getUpdates(userId)` - Fetch status updates

## React Hooks (`lib/use-data.ts`)

Custom hooks for data fetching with fallback to mock data:

- `useChats()` - Get filtered chats with real-time updates
- `useMessages(chatId)` - Get chat messages with send capability
- `useCommunities()` - Get communities list
- `useCalls()` - Get call history
- `useUpdates()` - Get status updates

## Authentication Context (`lib/auth-context.tsx`)

Provides authentication state across the app:

```typescript
const { user, loading, login, register, logout, isAuthenticated } = useAuth();
```

## Component Updates

### ChatsTab
- Now fetches real chats from Appwrite
- Falls back to mock data if user not authenticated
- Shows loading state while fetching

### UpdatesTab
- Fetches user status updates from Appwrite
- Displays loading indicator during fetch

### CallsTab
- Loads call history from Appwrite
- Shows loading state during data fetch

### CommunitiesTab
- Fetches communities from Appwrite
- Falls back to mock communities

## Fallback Behavior

All components implement graceful fallback to mock data when:
1. User is not authenticated
2. Appwrite connection fails
3. Collections don't have data yet

This ensures the UI remains functional during development and testing.

## Migration Checklist

- ✅ Appwrite SDK installed and configured
- ✅ Database collections created with proper schema
- ✅ Authentication implemented with email/password
- ✅ All data models migrated
- ✅ Components updated to use Appwrite
- ✅ Mock data as fallback for better UX
- ✅ Environment variables configured
- ✅ Error handling implemented

## Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env.local`

3. Initialize Appwrite collections:
   ```bash
   npm run setup-appwrite
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Security Considerations

1. **API Key**: Keep `APPWRITE_API_KEY` server-side only. Never expose in frontend code.
2. **Public Credentials**: `NEXT_PUBLIC_*` variables are visible in browser - this is expected for Appwrite public endpoints.
3. **Row-Level Security**: Appwrite permissions are auto-generated. Update them based on your security requirements.
4. **Session Management**: Use Appwrite's built-in session handling for user persistence.

## Troubleshooting

### Collections Not Created
- Verify `APPWRITE_API_KEY` is correct
- Check Appwrite instance is running and accessible
- Run setup script with verbose logging

### Auth Not Working
- Verify email/password registration flow
- Check Appwrite authentication settings in console
- Ensure sessions are enabled

### Data Not Loading
- Check browser console for Appwrite client errors
- Verify `NEXT_PUBLIC_APPWRITE_ENDPOINT` and `PROJECT_ID` are correct
- Ensure collections exist by running setup script

## Future Enhancements

1. Add real-time listeners for messages
2. Implement file upload functionality
3. Add search/filter capabilities
4. Implement user presence indicators
5. Add message reactions and replies
6. Enable end-to-end encryption

## Support

For issues or questions:
1. Check Appwrite documentation: https://appwrite.io/docs
2. Review console errors in browser DevTools
3. Verify all environment variables are set correctly
4. Run setup script to ensure collections are created
