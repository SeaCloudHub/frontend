import { IdentityRESP } from '@/apis/auth/response/auth.sign-in.response';

export type CreateFolderRES = {
  created_at: string;
  full_path: string;
  general_access: string;
  id: string;
  is_dir: boolean;
  mime_type: string;
  mode: number;
  name: string;
  owner: IdentityRESP;
  owner_id: string;
  path: string;
  shown_path: string;
  size: number;
  updated_at: string;
  md5: number[];
};
