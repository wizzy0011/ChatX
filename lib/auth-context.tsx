"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { account, getUser } from "./appwrite";

interface User {
  $id: string;
  email: string;
  name: string;
  avatar?: string;
  status?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const currentUser = await getUser();
      if (currentUser) {
        setUser({
          $id: currentUser.$id,
          email: currentUser.email,
          name: currentUser.name || currentUser.email,
          avatar: currentUser.name?.substring(0, 2).toUpperCase(),
        });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    try {
      await account.createEmailPasswordSession(email, password);
      await checkAuth();
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  async function register(email: string, password: string, name: string) {
    try {
      await account.create("unique()", email, password, name);
      await login(email, password);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  }

  async function logout() {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
