"use client";

import { X, ChevronRight, Moon, Sun } from "lucide-react";
import { useState } from "react";

interface SettingsScreenProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onThemeChange: (isDark: boolean) => void;
}

export function SettingsScreen({
  isOpen,
  onClose,
  isDarkMode,
  onThemeChange,
}: SettingsScreenProps) {
  if (!isOpen) return null;

  const settingsSections = [
    {
      title: "Account",
      items: [
        { label: "Subscription", value: "Pro" },
        { label: "Account", value: "user@chatx.com" },
      ],
    },
    {
      title: "Privacy & Data",
      items: [
        { label: "Privacy", value: "" },
        { label: "Lists", value: "" },
        { label: "Chats", value: "" },
      ],
    },
    {
      title: "Preferences",
      items: [
        { label: "Appearance", value: "" },
        { label: "Notifications", value: "" },
        { label: "Storage & Data", value: "" },
        { label: "Accessibility", value: "" },
      ],
    },
    {
      title: "Support",
      items: [
        { label: "App Language", value: "" },
        { label: "Help & Feedback", value: "" },
        { label: "Invite Friends", value: "" },
      ],
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />

      {/* Settings Panel */}
      <div className="fixed inset-0 z-50 flex items-end max-w-md:max-w-full">
        <div className="w-full bg-slate-900 rounded-t-3xl flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700 flex-shrink-0">
            <h2 className="text-2xl font-bold text-slate-100">Settings</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-full transition-colors"
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
                    onClick={() => onThemeChange(true)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      isDarkMode
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => onThemeChange(false)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      !isDarkMode
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800 text-slate-400"
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
                    className="w-full px-6 py-3 flex items-center justify-between hover:bg-slate-800 transition-colors text-slate-300 hover:text-slate-100"
                  >
                    <span className="text-sm">{item.label}</span>
                    <div className="flex items-center gap-2">
                      {item.value && (
                        <span className="text-xs text-slate-500">{item.value}</span>
                      )}
                      <ChevronRight size={18} className="text-slate-600" />
                    </div>
                  </button>
                ))}
              </div>
            ))}

            {/* Bottom padding */}
            <div className="h-6" />
          </div>
        </div>
      </div>
    </>
  );
}
