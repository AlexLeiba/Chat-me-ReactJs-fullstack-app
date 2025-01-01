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
// import { create } from 'zustand';

// const useThemeStore = create((set) => ({
//   theme: localStorage.getItem('chat-me-theme') || 'coffee',
//   setTheme: (theme) => {
//     localStorage.setItem('chat-me-theme', theme);
//     set({ theme });
//   },
// }));
// export default useThemeStore;
