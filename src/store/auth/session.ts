import { IdentityRESP } from '@/apis/auth/response/auth.sign-in.response';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { Role } from '../../utils/enums/role.enum';
import { getLocalStorage } from '../../utils/function/auth.function';
import { useCookies } from 'react-cookie';

const initIdentityValue = {
  id: null,
  email: null,
  password_changed_at: null,
  first_name: null,
  last_name: null,
  avatar_url: null,
  is_admin: null,
  last_sign_in_at: null,
};
type Identity = Pick<
  IdentityRESP,
  'id' | 'email' | 'password_changed_at' | 'first_name' | 'last_name' | 'avatar_url' | 'is_admin' | 'last_sign_in_at'
>;
type SessionState = {
  // token: string | null;
  role: Role | null;
  firstLogin: boolean;
  onEmailValid: (email: string, avatar_url: string, first_name: string, last_name: string, password_changed_at: string) => void;
  signIn: (role: Role | null, firstLogin: boolean, identity: Identity) => void;
  identity: Identity;
  signOut: () => void;
};

const value = JSON.parse(getLocalStorage('sessionStore') as string)?.state || {};

export const useSession = create<SessionState>()(
  devtools(
    persist(
      (set) => ({
        // token: value.token || null,
        role: value.role || null,
        firstLogin: true,
        identity: value.identity || initIdentityValue,
        signIn: (role: Role | null, firstLogin: boolean, identity: Identity) => {
          set({ role, identity: identity, firstLogin: firstLogin });
        },
        onEmailValid: (email, avatar_url: string, first_name: string, last_name: string, password_changed_at: string) =>
          set((state) => ({
            ...state,
            identity: {
              ...state.identity,
              email,
              avatar_url,
              first_name,
              last_name,
              password_changed_at,
            },
          })),
        signOut: () => {
          set({ role: null, identity: initIdentityValue });
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
