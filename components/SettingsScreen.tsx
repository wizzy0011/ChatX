"use client";

import { Suspense } from "react";
import { SettingsContent } from "./SettingsContent";

interface SettingsScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsScreen({ isOpen, onClose }: SettingsScreenProps) {
  if (!isOpen) return null;

  return (
    <Suspense fallback={null}>
      <SettingsContent onClose={onClose} />
    </Suspense>
  );
}
