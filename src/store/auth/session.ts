import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { Role } from '../../utils/enums/role.enum';
import { getLocalStorage } from '../../utils/function/auth.function';

type SessionState = {
  token: string | null;
  role: Role | null;
  email: string | null;
  firstLogin: boolean;
  onEmailValid: (email: string | null) => void;
  signIn: (token: string | null, role: Role | null, firstLogin?: boolean) => void;
  signOut: () => void;
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
        firstLogin: false,
        email: value.email || null,
        signIn: (token: string | null, role: Role | null, firstLogin?: boolean, root_id?: string) =>
          set({ token: token, role: role, firstLogin: firstLogin }),
        onEmailValid: (email: string | null) => set((state) => ({ ...state, email: email })),
        signOut: () => {
          set({ token: null, role: null, email: null });
          localStorage.clear();
        },
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
