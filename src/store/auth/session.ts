import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type SessionState = {
  token: string | null;
  updateToken: (token: string | null) => void;
};

export const useSession = create<SessionState>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        updateToken: (token: string | null) => set({ token: token }),
      }),
      { name: 'sessionStore', version: 1, getStorage: () => localStorage },
    ),
    { name: 'session-store', enabled: true },
  ),
);
