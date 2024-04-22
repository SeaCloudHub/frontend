export type UserManagementInfoDto = {
  userId?: string;
  name?: string;
  avatar?: string;
  usedMemory: number | 0;
  totalMemory: number;
  lastAccess?: string;
};
