export type UserManagementInfoDto = {
  userId?: string;
  isBlocked?: boolean;
  name?: string;
  avatar?: string;
  usedMemory: number | 0;
  totalMemory: number;
  lastAccess?: string;
  root_id?: string;
  isAdmin?: boolean;
};
