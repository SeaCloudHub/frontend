import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { Role } from '../../utils/enums/role.enum';
import { getLocalStorage } from '../../utils/function/auth.function';

type SessionState = {
  token: string | null;
  role: Role | null;
  email: string | null;
  firstLogin: boolean;
  root_id: string | null;
  onEmailValid: (email: string | null) => void;
  signIn: (token: string | null, role: Role | null, firstLogin?: boolean, root_id?: string) => void;
  signOut: () => void;
};

const value = {
  role: JSON.parse(getLocalStorage('sessionStore') as string)?.state?.role,
  token: JSON.parse(getLocalStorage('sessionStore') as string)?.state?.token,
  email: JSON.parse(getLocalStorage('sessionStore') as string)?.state?.email,
  root_id: JSON.parse(getLocalStorage('sessionStore') as string)?.state?.root_id,
};

export const useSession = create<SessionState>()(
  devtools(
    persist(
      (set) => ({
        token: value.token || null,
        role: value.role || null,
        firstLogin: false,
        email: value.email || null,
        root_id: value.root_id || null,
        signIn: (token: string | null, role: Role | null, firstLogin?: boolean, root_id?: string) =>
          set({ token: token, role: role, firstLogin: firstLogin, root_id: root_id}),
        onEmailValid: (email: string | null) => set((state) => ({ ...state, email: email })),
        signOut: () => set({ token: null, role: null, email: null }),
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
