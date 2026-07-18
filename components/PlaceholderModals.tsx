"use client";

import { X, ArrowLeft, Plus, Users, Share2, Smartphone, MessageSquare, CheckSquare, LogOut, Search } from "lucide-react";

// Search Modal
export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 animate-in slide-in-from-top-4 duration-300">
        <div className="w-96 bg-slate-900 rounded-2xl p-6 shadow-xl max-w-md:w-96">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-100">Search Chats</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-800 active:bg-slate-700 rounded-full transition-all active:scale-95">
              <X size={20} className="text-slate-400" />
            </button>
          </div>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
              autoFocus
            />
          </div>
          <p className="mt-6 text-sm text-slate-400">Type to search conversations, groups, or contacts</p>
        </div>
      </div>
    </>
  );
}

// New Group Modal
export function NewGroupModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-end max-w-md:max-w-full animate-in slide-in-from-bottom-4 duration-300">
        <div className="w-full bg-slate-900 rounded-t-3xl p-6 flex flex-col max-h-[80vh]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-100">Create New Group</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-800 active:bg-slate-700 rounded-full transition-all active:scale-95">
              <X size={24} className="text-slate-400" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4">
            <input type="text" placeholder="Group name" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500" />
            <p className="text-sm text-slate-400">Add members, set group topic, and customize settings</p>
            <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg transition-all active:scale-95 font-medium">
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// New Broadcast Modal
export function NewBroadcastModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-end max-w-md:max-w-full animate-in slide-in-from-bottom-4 duration-300">
        <div className="w-full bg-slate-900 rounded-t-3xl p-6 flex flex-col max-h-[80vh]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-100">New Broadcast</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-800 active:bg-slate-700 rounded-full transition-all active:scale-95">
              <X size={24} className="text-slate-400" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4">
            <p className="text-sm text-slate-400">Create a broadcast to send a message to multiple contacts at once</p>
            <textarea placeholder="Your broadcast message..." rows={4} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none" />
            <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg transition-all active:scale-95 font-medium">
              Select Recipients
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// Linked Devices Modal
export function LinkedDevicesModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  const devices = [
    { name: "iPhone 14 Pro", lastActive: "Active now", icon: "📱" },
    { name: "MacBook Pro", lastActive: "2 hours ago", icon: "💻" },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-end max-w-md:max-w-full animate-in slide-in-from-bottom-4 duration-300">
        <div className="w-full bg-slate-900 rounded-t-3xl p-6 flex flex-col max-h-[80vh]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-100">Linked Devices</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-800 active:bg-slate-700 rounded-full transition-all active:scale-95">
              <X size={24} className="text-slate-400" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3">
            {devices.map((device, index) => (
              <div key={index} className="px-4 py-4 bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{device.icon}</span>
                    <div>
                      <p className="text-slate-100 font-medium">{device.name}</p>
                      <p className="text-xs text-slate-400">{device.lastActive}</p>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-red-500 transition-colors active:scale-95">
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
            <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg transition-all active:scale-95 font-medium mt-4">
              Link New Device
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// Starred Messages Modal
export function StarredMessagesModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  const starredMessages = [
    { sender: "Alice", text: "Great idea! Let's do it.", time: "2 hours ago" },
    { sender: "Bob", text: "I'll join you tomorrow", time: "5 hours ago" },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-end max-w-md:max-w-full animate-in slide-in-from-bottom-4 duration-300">
        <div className="w-full bg-slate-900 rounded-t-3xl p-6 flex flex-col max-h-[80vh]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-100">Starred Messages</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-800 active:bg-slate-700 rounded-full transition-all active:scale-95">
              <X size={24} className="text-slate-400" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3">
            {starredMessages.length > 0 ? (
              starredMessages.map((msg, index) => (
                <div key={index} className="px-4 py-3 bg-slate-800 rounded-lg border border-slate-700">
                  <p className="text-sm text-blue-500 font-medium">{msg.sender}</p>
                  <p className="text-slate-100 mt-1">{msg.text}</p>
                  <p className="text-xs text-slate-500 mt-2">{msg.time}</p>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-center py-8">No starred messages yet</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// Switch Account Modal
export function SwitchAccountModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  const accounts = [
    { name: "Sarah Chen", email: "sarah@chatx.com", status: "Current" },
    { name: "John Dev", email: "john@chatx.com", status: "Available" },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-end max-w-md:max-w-full animate-in slide-in-from-bottom-4 duration-300">
        <div className="w-full bg-slate-900 rounded-t-3xl p-6 flex flex-col max-h-[80vh]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-100">Switch Account</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-800 active:bg-slate-700 rounded-full transition-all active:scale-95">
              <X size={24} className="text-slate-400" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3">
            {accounts.map((account, index) => (
              <button
                key={index}
                className="w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 rounded-lg border border-slate-700 transition-all active:scale-95 text-left"
              >
                <p className="text-slate-100 font-medium">{account.name}</p>
                <p className="text-xs text-slate-400">{account.email}</p>
                {account.status === "Current" && <p className="text-xs text-blue-500 mt-1">Current Account</p>}
              </button>
            ))}
            <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg transition-all active:scale-95 font-medium mt-4">
              Add New Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// New Chat Modal (for FAB)
export function NewChatModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-end max-w-md:max-w-full animate-in slide-in-from-bottom-4 duration-300">
        <div className="w-full bg-slate-900 rounded-t-3xl p-6 flex flex-col max-h-[80vh]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-100">Start New Chat</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-800 active:bg-slate-700 rounded-full transition-all active:scale-95">
              <X size={24} className="text-slate-400" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4">
            <input type="text" placeholder="Search contacts..." className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500" />
            <div className="space-y-2">
              {["Alice Johnson", "Bob Smith", "Carol White"].map((contact, index) => (
                <button key={index} className="w-full px-4 py-3 text-left bg-slate-800 hover:bg-slate-700 active:bg-slate-600 rounded-lg border border-slate-700 transition-all active:scale-95 text-slate-100">
                  {contact}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Read All Toast/Confirmation
export function ReadAllToast({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-2 duration-300">
      <div className="px-6 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 shadow-lg">
        <p className="text-sm font-medium">All messages marked as read</p>
      </div>
    </div>
  );
}
