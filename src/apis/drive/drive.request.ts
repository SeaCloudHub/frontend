
export type CopyFileREQ = {
  ids: string[];
  to: string;
};

export type ListEntriesREQ = {
  id: string;
  cusor?: string;
  limit?: number;
};

export type UploadFileREQ = {
  files: File[], 
  id: string
};

export type RenameREQ = {
  id: string;
  name: string;
};
