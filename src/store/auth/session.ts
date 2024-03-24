import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { Role } from '../../utils/enums/role.enum';
import { getlocalStrorage } from '../../utils/function/auth.function';

type SessionState = {
  token: string | null;
  role: Role | null;
  updateToken: (token: string | null) => void;
};
const value = {
  role: JSON.parse(getlocalStrorage('sessionStore') as string)?.state?.role,
  token: JSON.parse(getlocalStrorage('sessionStore') as string)?.state?.token,
};

export const useSession = create<SessionState>()(
  devtools(
    persist(
      (set) => ({
        token: value.token || null,
        role: value.role || null,
        updateToken: (token: string | null) => set({ token: token }),
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
