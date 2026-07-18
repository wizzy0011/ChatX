"use client";

import { X, Users, Share2, Smartphone, MessageSquare, CheckSquare, Settings, LogOut } from "lucide-react";

interface HomeMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSettings: () => void;
  onNewGroup: () => void;
  onNewBroadcast: () => void;
  onLinkedDevices: () => void;
  onStarredMessages: () => void;
  onReadAll: () => void;
  onSwitchAccount: () => void;
}

export function HomeMenu({
  isOpen,
  onClose,
  onSettings,
  onNewGroup,
  onNewBroadcast,
  onLinkedDevices,
  onStarredMessages,
  onReadAll,
  onSwitchAccount,
}: HomeMenuProps) {
  if (!isOpen) return null;

  const menuItems = [
    { icon: Users, label: "New Group", onClick: onNewGroup },
    { icon: Share2, label: "New Broadcast", onClick: onNewBroadcast },
    { icon: Smartphone, label: "Linked Devices", onClick: onLinkedDevices },
    { icon: MessageSquare, label: "Starred Messages", onClick: onStarredMessages },
    { icon: CheckSquare, label: "Read All", onClick: onReadAll },
    { icon: Settings, label: "Settings", onClick: onSettings },
    { icon: LogOut, label: "Switch Account", onClick: onSwitchAccount },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-30 max-w-md:max-w-full"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="fixed top-0 right-0 bottom-0 w-64 bg-slate-900 border-l border-slate-700 z-40 flex flex-col max-w-md:w-64">
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-lg font-bold text-slate-100">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 active:bg-slate-700 rounded-full transition-all active:scale-95"
            aria-label="Close menu"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (item.onClick) item.onClick();
                onClose();
              }}
              className="w-full px-4 py-3 flex items-center gap-4 text-slate-300 hover:bg-slate-800 active:bg-slate-700 hover:text-slate-100 transition-all active:scale-95 origin-left border-b border-slate-700 last:border-b-0"
            >
              <item.icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
