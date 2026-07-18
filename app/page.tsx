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

function HomeContent() {
  const [activeTab, setActiveTab] = useState("chats");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
    // In Phase 2, this would open a new chat creation dialog
    console.log("New chat clicked");
  };

  return (
    <main className="flex flex-col h-screen bg-black max-w-md mx-auto relative">
      {/* Header */}
      <ChatHeader onMenuClick={handleMenuClick} />

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
      />

      {/* Settings Screen */}
      <SettingsScreen isOpen={isSettingsOpen} onClose={handleCloseSettings} />
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
