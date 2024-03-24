import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { Role } from '../../utils/enums/role.enum';
import { getLocalStorage } from '../../utils/function/auth.function';

type SessionState = {
  token: string | null;
  role: Role | null;
  updateSession: (token: string | null, role: Role | null) => void;
};
const value = {
  role: JSON.parse(getLocalStorage('sessionStore') as string)?.state?.role,
  token: JSON.parse(getLocalStorage('sessionStore') as string)?.state?.token,
};

export const useSession = create<SessionState>()(
  devtools(
    persist(
      (set) => ({
        token: value.token || null,
        role: value.role || null,
        updateSession: (token: string | null, role: Role | null) => set({ token: token, role: role }),
      }),
      {
        name: 'sessionStore',
        version: 1,
        storage: createJSONStorage(() => localStorage),
      },
    ),
    { name: 'session-store', enabled: true },
  ),
);
