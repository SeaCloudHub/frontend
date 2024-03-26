export type AuthCheckEmailRESP = {
  exists: boolean;
};

export type AuthSignInRESP = {
  message: string;
  data: { identity: IdentityRESP; session_id: string; session_token: string; session_expires_at: string };
};

export type IdentityRESP = {
  id: string;
  email: string;
  password_changed_at: string;
  is_admin: boolean;
};
