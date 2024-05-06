export type CopyFileREQ = {
  ids: string[];
  to: string;
};

export type ListEntriesREQ = {
  id: string;
  cusor?: string;
  limit?: number;
};

export type ListEntriesPageREQ = {
  id: string;
  limit?: number;
  page?: number;
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