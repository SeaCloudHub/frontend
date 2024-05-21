import { IdentityRESP } from '../auth/response/auth.sign-in.response';

export type EntryRESP = {
  id: string;
  name: string;
  path: string;
  // full_path: string;
  shown_path: string;
  size: number;
  mode: number;
  mime_type: string;
  md5: string;
  is_dir: boolean;
  general_access: string;
  owner_id: string;
  thumbnail: string;
  owner: IdentityRESP;
  created_at: string;
  updated_at: string;
  type: string;
};

export type SuggestedEntriesRESP = EntryRESP & {
  parent: Pick<EntryRESP, 'id' & 'name' & 'path'>;
  log?: LogEntry;
};

export type ListEntriesRESP = {
  entries: EntryRESP[];
  cursor: string;
};

export type ListEntriesPageRESP = {
  entries: EntryRESP[];
  pagination: PageInfoRESP;
};

export type ParentRES = {
  id: string;
  name: string;
  path: string;
  full_path?: string;
};

export type RoleUser = {
  user_id: string;
  role: string;
};

export type EntryMetadataRES = {
  file: EntryRESP;
  parents: ParentRES[];
  users: RoleUser[];
};

export type RenameRESP = {
  full_path: string;
  id: string;
};

export type SharedEntriesRESP = EntryRESP[];

export type DeleteFilesRESP = EntryRESP[];

export type PageInfoRESP = {
  total_items: number;
  total_pages: number;
  current_page: number;
  next_page: number;
  previous_page: number;
  first_page: number;
  last_page: number;
  limit: number;
};

export type LogEntry = {
  user_id: string;
  action: string;
  created_at: Date;
  file_id: string;
};

export type SearchRESP = {
  entries: EntryRESP & { parent: ParentRES };
  cursor: string;
};
