"use client";

import { ArrowLeft } from "lucide-react";

export interface SettingsPageProps {
  onBack: () => void;
}

export function SubscriptionPage({ onBack }: SettingsPageProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-6 border-b border-slate-700">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-lg transition-all active:scale-95"
        >
          <ArrowLeft size={24} className="text-slate-400" />
        </button>
        <h1 className="text-2xl font-bold text-slate-100">Subscription</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <p className="text-slate-400 mb-4">Manage your ChatX subscription plan.</p>
        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-slate-300">Subscription settings coming soon</p>
        </div>
      </div>
    </div>
  );
}

export function AccountPage({ onBack }: SettingsPageProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-6 border-b border-slate-700">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-lg transition-all active:scale-95"
        >
          <ArrowLeft size={24} className="text-slate-400" />
        </button>
        <h1 className="text-2xl font-bold text-slate-100">Account</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <p className="text-slate-400 mb-4">Manage your account settings and profile.</p>
        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-slate-300">Account settings coming soon</p>
        </div>
      </div>
    </div>
  );
}

export function PrivacyPage({ onBack }: SettingsPageProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-6 border-b border-slate-700">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-lg transition-all active:scale-95"
        >
          <ArrowLeft size={24} className="text-slate-400" />
        </button>
        <h1 className="text-2xl font-bold text-slate-100">Privacy</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <p className="text-slate-400 mb-4">Control your privacy and security settings.</p>
        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-slate-300">Privacy settings coming soon</p>
        </div>
      </div>
    </div>
  );
}

export function ListsPage({ onBack }: SettingsPageProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-6 border-b border-slate-700">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-lg transition-all active:scale-95"
        >
          <ArrowLeft size={24} className="text-slate-400" />
        </button>
        <h1 className="text-2xl font-bold text-slate-100">Lists</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <p className="text-slate-400 mb-4">Manage your chat lists and categories.</p>
        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-slate-300">Lists settings coming soon</p>
        </div>
      </div>
    </div>
  );
}

export function ChatsPage({ onBack }: SettingsPageProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-6 border-b border-slate-700">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-lg transition-all active:scale-95"
        >
          <ArrowLeft size={24} className="text-slate-400" />
        </button>
        <h1 className="text-2xl font-bold text-slate-100">Chats</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <p className="text-slate-400 mb-4">Customize your chat experience.</p>
        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-slate-300">Chats settings coming soon</p>
        </div>
      </div>
    </div>
  );
}

export function AppearancePage({ onBack }: SettingsPageProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-6 border-b border-slate-700">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-lg transition-all active:scale-95"
        >
          <ArrowLeft size={24} className="text-slate-400" />
        </button>
        <h1 className="text-2xl font-bold text-slate-100">Appearance</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <p className="text-slate-400 mb-4">Choose your preferred appearance theme.</p>
        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-slate-300">Appearance settings coming soon</p>
        </div>
      </div>
    </div>
  );
}

export function NotificationsPage({ onBack }: SettingsPageProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-6 border-b border-slate-700">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-lg transition-all active:scale-95"
        >
          <ArrowLeft size={24} className="text-slate-400" />
        </button>
        <h1 className="text-2xl font-bold text-slate-100">Notifications</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <p className="text-slate-400 mb-4">Manage your notification preferences.</p>
        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-slate-300">Notifications settings coming soon</p>
        </div>
      </div>
    </div>
  );
}

export function StoragePage({ onBack }: SettingsPageProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-6 border-b border-slate-700">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-lg transition-all active:scale-95"
        >
          <ArrowLeft size={24} className="text-slate-400" />
        </button>
        <h1 className="text-2xl font-bold text-slate-100">Storage & Data</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <p className="text-slate-400 mb-4">Manage your storage and data usage.</p>
        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-slate-300">Storage settings coming soon</p>
        </div>
      </div>
    </div>
  );
}

export function AccessibilityPage({ onBack }: SettingsPageProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-6 border-b border-slate-700">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-lg transition-all active:scale-95"
        >
          <ArrowLeft size={24} className="text-slate-400" />
        </button>
        <h1 className="text-2xl font-bold text-slate-100">Accessibility</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <p className="text-slate-400 mb-4">Customize accessibility options.</p>
        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-slate-300">Accessibility settings coming soon</p>
        </div>
      </div>
    </div>
  );
}

export function LanguagePage({ onBack }: SettingsPageProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-6 border-b border-slate-700">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-lg transition-all active:scale-95"
        >
          <ArrowLeft size={24} className="text-slate-400" />
        </button>
        <h1 className="text-2xl font-bold text-slate-100">App Language</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <p className="text-slate-400 mb-4">Select your preferred app language.</p>
        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-slate-300">Language settings coming soon</p>
        </div>
      </div>
    </div>
  );
}

export function HelpPage({ onBack }: SettingsPageProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-6 border-b border-slate-700">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-lg transition-all active:scale-95"
        >
          <ArrowLeft size={24} className="text-slate-400" />
        </button>
        <h1 className="text-2xl font-bold text-slate-100">Help & Feedback</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <p className="text-slate-400 mb-4">Get help or send us your feedback.</p>
        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-slate-300">Help section coming soon</p>
        </div>
      </div>
    </div>
  );
}

export function InvitePage({ onBack }: SettingsPageProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-6 border-b border-slate-700">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-lg transition-all active:scale-95"
        >
          <ArrowLeft size={24} className="text-slate-400" />
        </button>
        <h1 className="text-2xl font-bold text-slate-100">Invite Friends</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <p className="text-slate-400 mb-4">Invite your friends to ChatX.</p>
        <div className="bg-slate-800 rounded-lg p-4">
          <p className="text-slate-300">Invite features coming soon</p>
        </div>
      </div>
    </div>
  );
}
