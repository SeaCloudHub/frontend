export type AuthCheckEmailRESP = {
  email: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  password_changed_at: string;
};

export type AuthSignInRESP = {
  identity: IdentityRESP;
  session_id: string;
  session_token: string;
  session_expires_at: string;
};

export type IdentityRESP = {
  id: string;
  email: string;
  password_changed_at: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  is_admin: boolean;
  is_active: boolean;
  last_sign_in_at: string;
  root_id: string;
  storage_usage: number;
  storage_capacity: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  blocked_at: string;
};
