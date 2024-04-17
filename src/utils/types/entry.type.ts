export type Entry = {
  id: string;
  name: string;
  full_path: string;
  size: number;
  mode: number;
  mime_type: string;
  md5: string;
  is_dir: boolean;
  created_at: string;
  updated_at: string;
};

export type UserAvatar = {
  username: string;
  url: string;
};

export enum DownloadPermission {
  DOWNLOAD,
  EDIT,
}

export type EntryDetails = {
  id: string;
  isDir: boolean;
  title: string;
  icon: React.ReactNode;
  preview: React.ReactNode;
  accessUsers: UserAvatar[];
  owner: UserAvatar;
  type: string;
  size: string;
  storageUsed: string;
  location: React.ReactNode;
  modified: Date;
  opened: Date;
  created: Date;
  downloadPermissions: DownloadPermission;
};

export enum ActivityAction {
  CREATE,
  OPEN,
  MODIFY,
  UPLOAD,
  DOWNLOAD,
  DELETE,
  SHARE,
}

export type Activity = {
  id: string;
  actor: UserAvatar;
  time: Date;
  action: ActivityAction;
  target: React.ReactNode;
};
