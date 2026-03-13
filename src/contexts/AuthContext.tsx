import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "admin" | "patient";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  verified: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  verify: (code: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users for demo
const MOCK_USERS: (User & { password: string })[] = [
  { id: "1", email: "admin@dentalcare.com", name: "Dr. Sarah Chen", role: "admin", verified: true, password: "admin123" },
  { id: "2", email: "patient@example.com", name: "John Smith", role: "patient", verified: true, password: "patient123" },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingUser, setPendingUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (!found) throw new Error("Invalid email or password");
    const { password: _, ...userData } = found;
    if (!userData.verified) {
      setPendingUser(userData);
      throw new Error("VERIFY_REQUIRED");
    }
    setUser(userData);
    setIsLoading(false);
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string, role: UserRole) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    if (MOCK_USERS.find(u => u.email === email)) throw new Error("Email already exists");
    const newUser: User = { id: Date.now().toString(), email, name, role, verified: false };
    setPendingUser(newUser);
    setIsLoading(false);
  }, []);

  const verify = useCallback(async (code: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 600));
    if (code !== "123456") throw new Error("Invalid verification code");
    if (pendingUser) {
      setUser({ ...pendingUser, verified: true });
      setPendingUser(null);
    }
    setIsLoading(false);
  }, [pendingUser]);

  const logout = useCallback(() => {
    setUser(null);
    setPendingUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, verify }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
