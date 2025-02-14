import { create } from "zustand";

interface UserAuthProps {
  token: string | null;
  user: {
    email: string;
    role: string;
  } | null;
  setAuth: (token: string, user: { email: string; role: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<UserAuthProps>((set) => ({
  token: localStorage.getItem("userToken"),
  user: (() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  })(),

  setAuth: (token, user) => {
    localStorage.setItem("userToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ token, user });
  },

  logout: () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    set({ token: null, user: null });
  },
}));
