import { GeneralAccessType } from "@/utils/types/general-access.type";

export type CopyFileREQ = {
  ids: string[];
  to: string;
};

export type ListEntriesREQ = {
  id: string;
  cursor?: string;
  limit?: number;
  after?: string;
  type?: TypeEntry;
};

export type TypeEntry = 'folder' | 'text' | 'document' | 'pdf' | 'json' | 'image' | 'video' | 'audio' | 'archive' | 'other' | '';

export type ListEntriesPageREQ = {
  id: string;
  limit?: number;
  page?: number;
  after?: string;
  type?: TypeEntry;
  query?: string;
};

export type UploadFileREQ = {
  files: File[];
  id: string;
};

export type RenameREQ = {
  id: string;
  name: string;
};

export type DeleteEntriesREQ = {
  source_ids: string[];
};

export type RestoreEntriesREQ = {
  source_ids: string[];
};

export type SuggestedEntriesREQ = {
  dir?: boolean;
  limit?: number;
};

export type StarEntriesREQ = {
  file_ids: string[];
};

export type SearchREQ = Partial<ListEntriesREQ> & { query: string };

export type DownloadMultipleEntriesREQ = {
  ids: string[];
  parent_id: string;
};

export type GetListFileSizesREQ = Pick<Partial<ListEntriesREQ>, 'after' | 'cursor' | 'limit' | 'type'> & { asc?: boolean };

export type GetActivityLogREQ = Pick<ListEntriesREQ, 'id' | 'cursor' | 'limit'>;

export type UpdateGeneralAccessREQ = {
  id: string;
  general_access: GeneralAccessType;
};
