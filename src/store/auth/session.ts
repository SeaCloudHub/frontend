import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type SessionState = {
  token: string | null;
  role: string | null;
  updateToken: (token: string | null) => void;
};

export const useSession = create<SessionState>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        role: 'admin',
        updateToken: (token: string | null) => set({ token: token }),
      }),
      { name: 'sessionStore', version: 1, storage: createJSONStorage(() => localStorage) },
    ),
    { name: 'session-store', enabled: true },
  ),
);
