"use client";

import { useState } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ChatHeader } from "@/components/ChatHeader";
import { FilterRow } from "@/components/FilterRow";
import { ChatsTab } from "@/components/ChatsTab";
import { UpdatesTab } from "@/components/UpdatesTab";
import { CallsTab } from "@/components/CallsTab";
import { CommunitiesTab } from "@/components/CommunitiesTab";
import { BottomNav } from "@/components/BottomNav";
import { FAB } from "@/components/FAB";
import { HomeMenu } from "@/components/HomeMenu";
import { SettingsScreen } from "@/components/SettingsScreen";
import {
  SearchModal,
  NewGroupModal,
  NewBroadcastModal,
  LinkedDevicesModal,
  StarredMessagesModal,
  SwitchAccountModal,
  NewChatModal,
  ReadAllToast,
} from "@/components/PlaceholderModals";

function HomeContent() {
  const [activeTab, setActiveTab] = useState("chats");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNewGroupOpen, setIsNewGroupOpen] = useState(false);
  const [isNewBroadcastOpen, setIsNewBroadcastOpen] = useState(false);
  const [isLinkedDevicesOpen, setIsLinkedDevicesOpen] = useState(false);
  const [isStarredMessagesOpen, setIsStarredMessagesOpen] = useState(false);
  const [isSwitchAccountOpen, setIsSwitchAccountOpen] = useState(false);
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [isReadAllToastOpen, setIsReadAllToastOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
    setIsMenuOpen(false);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };

  const handleFABClick = () => {
    setIsNewChatOpen(true);
  };

  const handleReadAll = () => {
    setIsReadAllToastOpen(true);
    setIsMenuOpen(false);
    setTimeout(() => setIsReadAllToastOpen(false), 2000);
  };

  return (
    <main className="flex flex-col h-screen bg-black max-w-md mx-auto relative">
      {/* Header */}
      <ChatHeader onMenuClick={handleMenuClick} onSearchClick={() => setIsSearchOpen(true)} />

      {/* Filter Row (only show for Chats tab) */}
      {activeTab === "chats" && (
        <FilterRow activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      )}

      {/* Tab Content */}
      {activeTab === "chats" && <ChatsTab filter={activeFilter} />}
      {activeTab === "updates" && <UpdatesTab />}
      {activeTab === "calls" && <CallsTab />}
      {activeTab === "communities" && <CommunitiesTab />}

      {/* Floating Action Button */}
      <FAB onClick={handleFABClick} />

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Home Menu */}
      <HomeMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSettings={handleSettingsClick}
        onNewGroup={() => {
          setIsNewGroupOpen(true);
          setIsMenuOpen(false);
        }}
        onNewBroadcast={() => {
          setIsNewBroadcastOpen(true);
          setIsMenuOpen(false);
        }}
        onLinkedDevices={() => {
          setIsLinkedDevicesOpen(true);
          setIsMenuOpen(false);
        }}
        onStarredMessages={() => {
          setIsStarredMessagesOpen(true);
          setIsMenuOpen(false);
        }}
        onReadAll={handleReadAll}
        onSwitchAccount={() => {
          setIsSwitchAccountOpen(true);
          setIsMenuOpen(false);
        }}
      />

      {/* Settings Screen */}
      <SettingsScreen isOpen={isSettingsOpen} onClose={handleCloseSettings} />

      {/* Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <NewGroupModal isOpen={isNewGroupOpen} onClose={() => setIsNewGroupOpen(false)} />
      <NewBroadcastModal isOpen={isNewBroadcastOpen} onClose={() => setIsNewBroadcastOpen(false)} />
      <LinkedDevicesModal isOpen={isLinkedDevicesOpen} onClose={() => setIsLinkedDevicesOpen(false)} />
      <StarredMessagesModal isOpen={isStarredMessagesOpen} onClose={() => setIsStarredMessagesOpen(false)} />
      <SwitchAccountModal isOpen={isSwitchAccountOpen} onClose={() => setIsSwitchAccountOpen(false)} />
      <NewChatModal isOpen={isNewChatOpen} onClose={() => setIsNewChatOpen(false)} />

      {/* Toast Notifications */}
      <ReadAllToast isOpen={isReadAllToastOpen} onClose={() => setIsReadAllToastOpen(false)} />
    </main>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}
