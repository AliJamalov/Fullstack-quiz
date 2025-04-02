import { create } from "zustand";

export const useNotificationStore = create((set) => ({
  cardNotification: 0,

  setCardNotification: (notification) => set({ cardNotification: notification }),
}));
