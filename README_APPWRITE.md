# ChatX - Appwrite Backend

ChatX is a premium mobile messaging application that has been fully migrated to Appwrite as the backend service.

## Quick Start

### Prerequisites
- Node.js 18+ 
- Appwrite instance (self-hosted or cloud)

### Setup

1. **Clone and install**
   ```bash
   npm install
   ```

2. **Configure Appwrite credentials**
   
   Create `.env.local`:
   ```bash
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://your-appwrite-instance.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=chatx_db
   APPWRITE_ENDPOINT=https://your-appwrite-instance.io/v1
   APPWRITE_PROJECT_ID=your_project_id
   APPWRITE_API_KEY=your_api_key
   ```

3. **Initialize Appwrite**
   ```bash
   npm run setup-appwrite
   ```
   This creates all required collections and attributes.

4. **Run development server**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

5. **Build for production**
   ```bash
   npm run build
   npm run start
   ```

## Project Structure

```
app/                   # Next.js app directory
├── page.tsx          # Main chat interface
├── layout.tsx        # Root layout with AuthProvider
└── globals.css       # Tailwind styles

components/           # React components
├── ChatsTab.tsx      # Chat list view
├── UpdatesTab.tsx    # User updates
├── CallsTab.tsx      # Call history
└── CommunitiesTab.tsx # Communities

lib/                  # Utilities and services
├── appwrite.ts       # Appwrite client wrapper
├── auth-context.tsx  # Authentication state
├── use-data.ts       # Data fetching hooks
└── mockData.ts       # Fallback mock data

scripts/
└── setup-appwrite.mjs # Database initialization
```

## Appwrite Collections

### Users
Stores user profile information
- name, email, avatar, status, createdAt

### Chats
Conversations (direct or group)
- name, isGroup, createdBy, participants, lastMessage, isPinned, timestamps

### Messages
Individual messages in chats
- chatId, userId, content, mediaUrl, createdAt

### Communities
Community groups
- name, description, members, avatar

### Calls
Call history records
- callerId, recipientId, type, duration, createdAt

### Updates
User status updates
- userId, status, createdAt

### Contacts
User contact relationships
- userId, contactId, status

### Participants
Chat participant tracking
- chatId, userId, joinedAt

## Features

- **User Authentication** - Email/password signup and login
- **Chat Management** - Create, manage, and filter conversations
- **Message History** - Persistent message storage
- **Communities** - Join and view community groups
- **Call History** - Track incoming and outgoing calls
- **Status Updates** - Post and view user updates
- **Graceful Fallbacks** - Shows mock data when offline

## Key Files Explained

### `lib/appwrite.ts`
Provides Appwrite client initialization and helper functions:
- Authentication methods (login, register, logout)
- Database queries (getChats, getMessages, etc.)
- Type-safe API wrapper

### `lib/auth-context.tsx`
React Context for global authentication state:
- Provides `useAuth()` hook
- Manages current user session
- Handles login/register/logout

### `lib/use-data.ts`
Custom React hooks for data operations:
- `useChats()` - Fetch user chats
- `useMessages()` - Fetch chat messages
- `useCommunities()` - Fetch communities
- `useCalls()` - Fetch call history
- `useUpdates()` - Fetch status updates

All hooks implement fallback to mock data for better UX.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_APPWRITE_ENDPOINT` | Yes | Appwrite API endpoint URL |
| `NEXT_PUBLIC_APPWRITE_PROJECT_ID` | Yes | Appwrite project ID |
| `NEXT_PUBLIC_APPWRITE_DATABASE_ID` | Yes | Database ID (usually `chatx_db`) |
| `APPWRITE_ENDPOINT` | Yes* | Server-side endpoint (for setup) |
| `APPWRITE_PROJECT_ID` | Yes* | Server-side project ID |
| `APPWRITE_API_KEY` | Yes* | API key for server operations |

*Only needed when running `npm run setup-appwrite`

## Available Scripts

```bash
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run setup-appwrite  # Initialize Appwrite collections
```

## Authentication Flow

1. User signs up with email/password
2. Appwrite creates account and session
3. User profile created in Users collection
4. Session stored in browser (managed by Appwrite)
5. AuthProvider tracks user state globally
6. Components access auth via `useAuth()` hook

## Data Flow

```
Component → useAuth/useData hooks → Appwrite SDK → Appwrite Backend
                                           ↓
                                    Mock data (fallback)
```

Components always have data to display:
- When authenticated: Real data from Appwrite
- When not authenticated: Mock data for demo

## Performance Optimization

- Data fetching wrapped in try-catch with error handling
- Fallback to mock data if queries fail
- Loading states for better UX
- Efficient queries with indexes

## Security Notes

1. **API Key** - Keep `APPWRITE_API_KEY` server-side only
2. **Public Variables** - `NEXT_PUBLIC_*` variables are visible in browser (expected)
3. **Session Management** - Appwrite handles secure session cookies
4. **Data Validation** - Appwrite enforces schema on all operations

## Troubleshooting

### Collections not created?
```bash
npm run setup-appwrite
```

### Wrong credentials?
- Verify `NEXT_PUBLIC_APPWRITE_ENDPOINT` format
- Check project ID matches your Appwrite instance
- Confirm API key has admin permissions

### Data not loading?
- Check browser console for errors
- Verify Appwrite instance is accessible
- Ensure environment variables are set

### Build fails?
```bash
rm -rf .next node_modules
npm install
npm run build
```

## Deployment

### Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in project settings
4. Deploy

### Self-hosted
1. Run `npm run build`
2. Run `npm run start`
3. Set environment variables on server

## Documentation Links

- [Appwrite Docs](https://appwrite.io/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)

## Additional Resources

- `APPWRITE_MIGRATION.md` - Complete migration guide
- `MIGRATION_SUMMARY.md` - Migration overview
- `.env.example` - Environment variables template

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Appwrite documentation
3. Check browser console for errors
4. Verify all environment variables are set

---

**Status**: Production Ready | **Last Updated**: 2026-07-23
