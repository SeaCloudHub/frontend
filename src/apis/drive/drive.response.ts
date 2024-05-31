import { PaginationRESP } from '@/utils/types/api-base-response.type';
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
  is_starred: boolean;
  userRoles?: ('owner' | 'editor' | 'viewer')[];
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
  pagination: PaginationRESP;
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
  email: string;
  first_name: string;
  last_name: string;
  avatar_url:string;
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

export type SharedEntriesRESP = {
  entries: EntryRESP[];
  cursor: string;
};

export type DeleteFilesRESP = EntryRESP[];

export type PageInfoRESP = PaginationRESP;

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

export type LogItem = {
  action: string;
  created_at: string;
  file_id: string;
  user: IdentityRESP;
  user_id: string;
};

export type ActivityLogRESP = {
  activities: LogItem[];
  cursor: string;
};

export type DataSidePanelAction = {
  id: string;
  title: string;
};

export type LocalActivityLog = {
  time: string;
  data: {
    action: string;
    timeAction: Date;
    actor: { name: string; avatar: string };
  }[];
}[];
