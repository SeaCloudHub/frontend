import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { Role } from '../../utils/enums/role.enum';
import { getSessionToken } from '../../utils/function/auth.function';

type SessionState = {
  token: string | null;
  role: Role | null;
  updateToken: (token: string | null) => void;
};

export const useSession = create<SessionState>()(
  devtools(
    persist(
      (set) => ({
        token: getSessionToken('sessionStore') ?? JSON.parse(getSessionToken('sessionStore') as string)?.state?.token ,
        role: getSessionToken('sessionStore') ?? JSON.parse(getSessionToken('sessionStore') as string)?.state?.role ,
        updateToken: (token: string | null) => set({ token: token }),
      }),
      { name: 'sessionStore', version: 1, storage: createJSONStorage(() => localStorage) },
    ),
    { name: 'session-store', enabled: true },
  ),
);
