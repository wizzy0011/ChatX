"use client";

import { X, ChevronRight, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import {
  SubscriptionPage,
  AccountPage,
  PrivacyPage,
  ListsPage,
  ChatsPage,
  AppearancePage,
  NotificationsPage,
  StoragePage,
  AccessibilityPage,
  LanguagePage,
  HelpPage,
  InvitePage,
} from "./SettingsPages";

interface SettingsContentProps {
  onClose: () => void;
}

export function SettingsContent({ onClose }: SettingsContentProps) {
  const { isDarkMode, toggleTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  const settingsSections = [
    {
      title: "Account",
      items: [
        { label: "Subscription", page: "subscription" },
        { label: "Account", page: "account" },
      ],
    },
    {
      title: "Privacy & Data",
      items: [
        { label: "Privacy", page: "privacy" },
        { label: "Lists", page: "lists" },
        { label: "Chats", page: "chats" },
      ],
    },
    {
      title: "Preferences",
      items: [
        { label: "Appearance", page: "appearance" },
        { label: "Notifications", page: "notifications" },
        { label: "Storage & Data", page: "storage" },
        { label: "Accessibility", page: "accessibility" },
      ],
    },
    {
      title: "Support",
      items: [
        { label: "App Language", page: "language" },
        { label: "Help & Feedback", page: "help" },
        { label: "Invite Friends", page: "invite" },
      ],
    },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case "subscription":
        return <SubscriptionPage onBack={() => setCurrentPage(null)} />;
      case "account":
        return <AccountPage onBack={() => setCurrentPage(null)} />;
      case "privacy":
        return <PrivacyPage onBack={() => setCurrentPage(null)} />;
      case "lists":
        return <ListsPage onBack={() => setCurrentPage(null)} />;
      case "chats":
        return <ChatsPage onBack={() => setCurrentPage(null)} />;
      case "appearance":
        return <AppearancePage onBack={() => setCurrentPage(null)} />;
      case "notifications":
        return <NotificationsPage onBack={() => setCurrentPage(null)} />;
      case "storage":
        return <StoragePage onBack={() => setCurrentPage(null)} />;
      case "accessibility":
        return <AccessibilityPage onBack={() => setCurrentPage(null)} />;
      case "language":
        return <LanguagePage onBack={() => setCurrentPage(null)} />;
      case "help":
        return <HelpPage onBack={() => setCurrentPage(null)} />;
      case "invite":
        return <InvitePage onBack={() => setCurrentPage(null)} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={() => {
          if (currentPage) {
            setCurrentPage(null);
          } else {
            onClose();
          }
        }}
      />

      {/* Settings Panel */}
      <div className="fixed inset-0 z-50 flex items-end max-w-md:max-w-full animate-in slide-in-from-bottom-4 duration-300">
        <div className="w-full bg-slate-900 rounded-t-3xl flex flex-col max-h-[90vh]">
          {/* Page Content */}
          {currentPage ? (
            renderPage()
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700 flex-shrink-0">
                <h2 className="text-2xl font-bold text-slate-100">Settings</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-800 rounded-full transition-all active:scale-95 active:bg-slate-700"
                >
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Theme Toggle */}
                <div className="px-6 py-4 border-b border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {isDarkMode ? (
                        <Moon size={20} className="text-blue-500" />
                      ) : (
                        <Sun size={20} className="text-slate-400" />
                      )}
                      <span className="text-slate-300">Appearance</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleTheme(true)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all active:scale-95 ${
                          isDarkMode
                            ? "bg-blue-600 text-white active:bg-blue-700"
                            : "bg-slate-800 text-slate-400 active:bg-slate-700"
                        }`}
                      >
                        Dark
                      </button>
                      <button
                        onClick={() => toggleTheme(false)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all active:scale-95 ${
                          !isDarkMode
                            ? "bg-blue-600 text-white active:bg-blue-700"
                            : "bg-slate-800 text-slate-400 active:bg-slate-700"
                        }`}
                      >
                        Light
                      </button>
                    </div>
                  </div>
                </div>

                {/* Settings Sections */}
                {settingsSections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="border-b border-slate-700">
                    <h3 className="px-6 pt-4 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {section.title}
                    </h3>
                    {section.items.map((item, itemIndex) => (
                      <button
                        key={itemIndex}
                        onClick={() => setCurrentPage(item.page)}
                        className="w-full px-6 py-3 flex items-center justify-between hover:bg-slate-800 active:bg-slate-700 transition-all text-slate-300 hover:text-slate-100 active:scale-95 origin-left"
                      >
                        <span className="text-sm">{item.label}</span>
                        <ChevronRight size={18} className="text-slate-600" />
                      </button>
                    ))}
                  </div>
                ))}

                {/* Bottom padding */}
                <div className="h-6" />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
