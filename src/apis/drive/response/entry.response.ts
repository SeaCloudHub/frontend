import { IdentityRESP } from "@/apis/auth/response/auth.sign-in.response";

export type EntryRESP = {
  id: string;
  name: string;
  path: string;
  full_path: string;
  shown_path: string;
  size: number;
  mode: number;
  mine_type: string;
  md5: string;
  is_dir: boolean;
  general_access: string;
  owner_id: string;
  owner: IdentityRESP;
  created_at: string;
  updated_at: string;
};