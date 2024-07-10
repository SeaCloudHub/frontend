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

export type UploadChunkRESP = {
  id: string;
  name: string;
  path: string;
  shown_path: string;
  size: number;
  mode: number;
  mime_type: string;
  type: string;
  thumbnail: null;
  md5: string;
  is_dir: boolean;
  general_access: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
  userRoles: any;
  is_starred: boolean;
};