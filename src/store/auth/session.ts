import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { Role } from '../../utils/enums/role.enum';
import { getLocalStorage } from '../../utils/function/auth.function';

type SessionState = {
  token: string | null;
  role: Role | null;
  email: string | null;
  onEmailValid: (email: string | null) => void;
  signIn: (token: string | null, role: Role | null) => void;
};
const value = {
  role: JSON.parse(getLocalStorage('sessionStore') as string)?.state?.role,
  token: JSON.parse(getLocalStorage('sessionStore') as string)?.state?.token,
  email: JSON.parse(getLocalStorage('sessionStore') as string)?.state?.email,
};

export const useSession = create<SessionState>()(
  devtools(
    persist(
      (set) => ({
        token: value.token || null,
        role: value.role || null,
        email: value.email || null,
        signIn: (token: string | null, role: Role | null) => set({ token: token, role: role }),
        onEmailValid: (email: string | null) => set((state) => ({ ...state, email: email })),
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
