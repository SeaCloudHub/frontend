export type AuthCheckEmailRESP = {
  email: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  password_changed_at: string;
};

export type AuthSignInRESP = {
  message: string;
  data: { identity: IdentityRESP; session_id: string; session_token: string; session_expires_at: string };
};

export type IdentityRESP = {
  id: string;
  email: string;
  password_changed_at: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  is_admin: boolean;
};
