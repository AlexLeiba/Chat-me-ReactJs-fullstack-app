'use client';
import { create, StoreApi, UseBoundStore } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeStore = {
  globalTheme: string;
  setGlobalTheme: (theme: string) => void;
};

const useGlobalTeamStore: UseBoundStore<StoreApi<ThemeStore>> = create(
  persist(
    (set): ThemeStore => ({
      globalTheme: 'black',
      setGlobalTheme: (globalTheme: string) => {
        localStorage.setItem('chat-me-theme', globalTheme);
        set({ globalTheme });
      },
    }),
    {
      name: 'chat-me-theme', //unique name for localStorage key
    }
  )
);
export default useGlobalTeamStore;
