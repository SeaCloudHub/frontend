type Style = {
  [key: string]: string | number | boolean;
};
export type FileViewerProps = {
  fileType?: string;
  file?: File;
  fileId?: string;
  rootId?: string;
  fileName?: string;
};
