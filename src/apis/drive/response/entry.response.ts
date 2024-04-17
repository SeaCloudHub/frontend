import { IdentityRESP } from "@/apis/auth/response/auth.sign-in.response";

export type EntryRESP = {
  created_at: string;
  full_path: string;
  general_access: string;
  id: string;
  is_dir: boolean;
  md5: number[];
  mine_type: string;
  mode: number;
  name: string;
  owner: IdentityRESP;
  owner_id: string;
  root_id: string;
  updated_at: string;
};