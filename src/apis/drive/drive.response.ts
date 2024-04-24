import { IdentityRESP } from "../auth/response/auth.sign-in.response";

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

export type ListEntriesRESP = {
  entries: EntryRESP[];
  cursor: string;
};

export type ParentRES = {
  id: string;
  name: string;
  path: string;
  full_path: string;
}

export type EntryMetadataRES = {
  file: EntryRESP;
  parents: ParentRES[];
}

export type RenameRESP = {
  full_path: string;
  id: string;
};

