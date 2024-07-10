export type CreateFolderREQ = {
  id: string;
  name: string;
};

export type UploadFileREQ = {
  id: string;
  files: File[];
};

export type UploadChunkREQ = {
  file_id: string;
  id: string;
  last: boolean;
  total_size: number;
  file: File;
};

export type UpdateGeneralAccessREQ = {
  id: string;
  general_access: string;
};
