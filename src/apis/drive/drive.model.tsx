export type ListEntriesResponse = {
  cursor: string;
  entries: FileModel[];
};

export type FileModel = {
  created_at: string;
  full_path: string;
  general_access: string;
  id: string;
  is_dir: boolean;
  md5: string;
  mime_type: string;
  mode: number;
  // mode: FileMode;
  name: string;
  owner: User;
  owner_id: string;
  path: string;
  shown_path: string;
  size: number;
  updated_at: string;
};

// actually it is [2147483648, 1073741824, 536870912, 268435456, 134217728, 67108864, 33554432, 16777216, 8388608, 4194304, 2097152, 1048576, 524288, 2401763328, 511, 2147483648, 1073741824, 536870912, 268435456, 134217728, 67108864, 33554432, 16777216, 8388608, 4194304, 2097152, 1048576, 524288, 2401763328, 511]
export enum FileMode {
  READ = 'read',
  WRITE = 'write',
  READ_WRITE = 'read_write',
}

export type User = {
  avatar_url: string;
  created_at: string;
  email: string;
  first_name: string;
  id: string;
  is_active: boolean;
  is_admin: boolean;
  last_name: string;
  last_sign_in_at: string;
  password_changed_at: string;
  root_id: string;
  storage_capacity: number;
  storage_usage: number;
  updated_at: string;
};
