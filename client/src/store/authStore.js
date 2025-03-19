import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  checkingAuthLoading: false,
  loginLoading: false,
  signupLoading: false,

  signup: async (username, password) => {
    set({ signupLoading: true });
    try {
      const response = await axiosInstance.post("/auth/signup", { username, password });
      set({ user: response.data.user });
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error?.response.data.message || "registration failed");
    } finally {
      set({ signupLoading: false });
    }
  },

  login: async (username, password) => {
    set({ loginLoading: true });
    try {
      const response = await axiosInstance.post("auth/login", { username, password });
      set({ user: response.data.user });
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(error?.response.data.message || "login failed");
    } finally {
      set({ loginLoading: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null });
      toast.success("You logged out successfuly!");
    } catch (error) {
      console.error(error);
      toast.error(error?.response.data.message || "Error");
    }
  },

  checkAuth: async () => {
    set({ checkingAuthLoading: true });
    try {
      const response = await axiosInstance.get("/auth/me");
      set({ user: response.data });
    } catch (error) {
      console.error(error);
    } finally {
      set({ checkingAuthLoading: false });
    }
  },
}));
