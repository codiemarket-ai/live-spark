import React, { createContext, useContext, useState } from "react";

export type UserRole = "student" | "instructor" | "admin" | null;

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

const mockUsers: Record<string, User> = {
  student: { id: "1", name: "Ahmed Hassan", email: "ahmed@demo.com", avatar: "AH", role: "student" },
  instructor: { id: "2", name: "Sarah Mitchell", email: "sarah@demo.com", avatar: "SM", role: "instructor" },
  admin: { id: "3", name: "Admin User", email: "admin@demo.com", avatar: "AD", role: "admin" },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (_email: string, _password: string) => {
    setUser(mockUsers.student);
  };

  const signup = (name: string, email: string, _password: string) => {
    setUser({ id: "99", name, email, avatar: name.slice(0, 2).toUpperCase(), role: "student" });
  };

  const logout = () => setUser(null);

  const setRole = (role: UserRole) => {
    if (role && mockUsers[role]) {
      setUser(mockUsers[role]);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role: user?.role ?? null, isAuthenticated: !!user, login, signup, logout, setRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};