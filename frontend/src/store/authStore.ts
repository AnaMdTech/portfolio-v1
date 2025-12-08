import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  profileImage: string;
}

interface AuthState {
  token: string | null;
  user: User | null; // <--- Add this
  isAuthenticated: boolean;
  login: (token: string, user: User) => void; // <--- Update signature
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user") || "null"), // Load from storage
  isAuthenticated: !!localStorage.getItem("token"),

  login: (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user)); // Save user
    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null, isAuthenticated: false });
  },
}));
