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
  user_id: string | null;
  signOut: () => void;
};

const value = {
  role: JSON.parse(getLocalStorage('sessionStore') as string)?.state?.role,
  token: JSON.parse(getLocalStorage('sessionStore') as string)?.state?.token,
  email: JSON.parse(getLocalStorage('sessionStore') as string)?.state?.email,
  user_id: JSON.parse(getLocalStorage('sessionStore') as string)?.state?.user_id,
};

export const useSession = create<SessionState>()(
  devtools(
    persist(
      (set) => ({
        token: value.token || null,
        role: value.role || null,
        firstLogin: false,
        email: value.email || null,
        user_id: value.user_id || null,
        signIn: (token: string | null, role: Role | null, firstLogin?: boolean, user_id?: string) =>
          set({ token: token, role: role, firstLogin: firstLogin, user_id: user_id }),
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
