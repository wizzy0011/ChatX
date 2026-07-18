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

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away";
}

export const mockChats: Chat[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "SJ",
    lastMessage: "That sounds perfect! See you then 😊",
    time: "2:30 PM",
    unread: 2,
    isPinned: true,
    isGroup: false,
  },
  {
    id: "2",
    name: "Tech Team",
    avatar: "TT",
    lastMessage: "Code review is ready for merging",
    time: "1:15 PM",
    unread: 0,
    isPinned: true,
    isGroup: true,
  },
  {
    id: "3",
    name: "Alex Chen",
    avatar: "AC",
    lastMessage: "Let me check and get back to you",
    time: "12:45 PM",
    unread: 1,
    isPinned: false,
    isGroup: false,
  },
  {
    id: "4",
    name: "Design Crew",
    avatar: "DC",
    lastMessage: "New mockups uploaded to Figma",
    time: "11:20 AM",
    unread: 0,
    isPinned: false,
    isGroup: true,
  },
  {
    id: "5",
    name: "Emma Wilson",
    avatar: "EW",
    lastMessage: "Thanks for the recommendation!",
    time: "Yesterday",
    unread: 0,
    isPinned: false,
    isGroup: false,
  },
  {
    id: "6",
    name: "Project Alpha",
    avatar: "PA",
    lastMessage: "Sprint planning meeting scheduled",
    time: "Yesterday",
    unread: 3,
    isPinned: false,
    isGroup: true,
  },
  {
    id: "7",
    name: "Mike Santos",
    avatar: "MS",
    lastMessage: "Caught the game last night?",
    time: "2 days ago",
    unread: 0,
    isPinned: false,
    isGroup: false,
  },
  {
    id: "8",
    name: "Marketing Hub",
    avatar: "MH",
    lastMessage: "Campaign results are in!",
    time: "2 days ago",
    unread: 5,
    isPinned: false,
    isGroup: true,
  },
];

export const mockUpdates = [
  { id: "1", name: "Sarah Johnson", time: "2 hours ago", status: "Posted a story" },
  { id: "2", name: "Alex Chen", time: "5 hours ago", status: "Updated their profile" },
  { id: "3", name: "Emma Wilson", time: "1 day ago", status: "Posted a story" },
];

export const mockCalls = [
  { id: "1", name: "Sarah Johnson", time: "Today, 3:45 PM", type: "incoming", duration: "5 min" },
  { id: "2", name: "Tech Team", time: "Today, 2:15 PM", type: "outgoing", duration: "15 min" },
  { id: "3", name: "Alex Chen", time: "Yesterday, 10:30 AM", type: "incoming", duration: "2 min" },
];

export const mockCommunities = [
  { id: "1", name: "Tech Enthusiasts", members: "2.3K", description: "Share tech news and updates" },
  { id: "2", name: "Design Hub", members: "1.8K", description: "Design inspiration and resources" },
  { id: "3", name: "Book Club", members: "456", description: "Discuss and share books" },
];
