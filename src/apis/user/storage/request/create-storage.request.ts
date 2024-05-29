export type CreateFolderREQ = {
  id: string;
  name: string;
};

export type UploadFileREQ = {
  id: string;
  files: File[];
};

export type UpdateGeneralAccessREQ = {
  id: string;
  general_access: string;
};
