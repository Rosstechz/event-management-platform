import { create } from "zustand";

interface AdminAuthProps {
  isAdminAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAdminAuth = create<AdminAuthProps>((set) => ({
  isAdminAuthenticated: !!localStorage.getItem("adminToken"),

  login: (token: string) => {
    localStorage.setItem("adminToken", token);
    set({ isAdminAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("adminToken");
    set({ isAdminAuthenticated: false });
  },
}));
