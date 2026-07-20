"use client";

import { X, Upload, Loader } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import type { Profile } from "@/lib/auth-context";

interface ProfileEditScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileEditScreen({ isOpen, onClose }: ProfileEditScreenProps) {
  const { profile, updateProfile } = useAuth();
  const [displayName, setDisplayName] = useState(profile?.display_name || "");
  const [username, setUsername] = useState(profile?.username || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [status, setStatus] = useState(profile?.status || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [usernameError, setUsernameError] = useState("");

  if (!isOpen || !profile) return null;

  const validateUsername = async (newUsername: string) => {
    if (!newUsername.trim()) {
      setUsernameError("Username cannot be empty");
      return false;
    }

    if (newUsername.length < 3 || newUsername.length > 30) {
      setUsernameError("Username must be 3-30 characters");
      return false;
    }

    if (!/^[a-z0-9_]+$/.test(newUsername)) {
      setUsernameError(
        "Username can only contain lowercase letters, numbers, and underscores"
      );
      return false;
    }

    setUsernameError("");
    return true;
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!displayName.trim()) {
      setError("Display name cannot be empty");
      return;
    }

    if (!(await validateUsername(username))) {
      return;
    }

    setIsSaving(true);

    const { error: updateError } = await updateProfile({
      display_name: displayName,
      username: username,
      bio: bio,
      status: status,
    });

    if (updateError) {
      setError(
        updateError.message || "Failed to update profile. Please try again."
      );
    } else {
      setSuccess("Profile updated successfully");
      setTimeout(() => {
        onClose();
      }, 1500);
    }

    setIsSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-end">
      <div className="bg-slate-900 w-full rounded-t-2xl max-w-md max-h-[90vh] overflow-y-auto flex flex-col border-t border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700 sticky top-0 bg-slate-900">
          <h2 className="text-xl font-bold text-slate-100">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full transition-all"
            aria-label="Close"
          >
            <X size={24} className="text-slate-300" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col gap-6">
          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Profile Picture
            </label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-slate-700 rounded-full overflow-hidden flex-shrink-0">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-2xl font-bold text-slate-500">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  </div>
                )}
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all active:scale-95">
                <Upload size={16} />
                <span className="text-sm">Upload Photo</span>
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Tip: Profile photos update from your Google account
            </p>
          </div>

          {/* Display Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your display name"
              maxLength={30}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            />
            <p className="text-xs text-slate-500 mt-1">
              {displayName.length}/30 characters
            </p>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value.toLowerCase());
                setUsernameError("");
              }}
              placeholder="your_username"
              maxLength={30}
              className={`w-full px-4 py-2 bg-slate-800 border rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none ${
                usernameError
                  ? "border-red-500 focus:border-red-500"
                  : "border-slate-700 focus:border-blue-500"
              }`}
            />
            <p
              className={`text-xs mt-1 ${
                usernameError ? "text-red-400" : "text-slate-500"
              }`}
            >
              {usernameError || "Lowercase letters, numbers, and underscores only"}
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>
            <div className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-400">
              {profile.email}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Email cannot be changed - it identifies your account
            </p>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              maxLength={150}
              rows={3}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 resize-none"
            />
            <p className="text-xs text-slate-500 mt-1">
              {bio.length}/150 characters
            </p>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Status
            </label>
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="e.g., Available, Away, In a meeting"
              maxLength={50}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            />
            <p className="text-xs text-slate-500 mt-1">
              {status.length}/50 characters
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-900/20 border border-red-700 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-3 bg-green-900/20 border border-green-700 rounded-lg">
              <p className="text-green-400 text-sm">{success}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-4 border-t border-slate-700 bg-slate-900">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-lg transition-all active:scale-95 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSaving && <Loader size={16} className="animate-spin" />}
            <span>{isSaving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
