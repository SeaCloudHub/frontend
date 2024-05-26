import { SelectedType } from '@/store/my-drive/myDrive.store';
import { UserRole } from '../types/user-role.type';
import { UserRoleEnum } from '../enums/user-role.enum';

export const isPermission = (userRoles: UserRole[]): number => {
  if (userRoles?.includes('owner')) return 3;
  else if (userRoles?.includes('editor')) return 2;
  else if (userRoles?.includes('viewer')) return 1;
  else return 0;
};

export const isSelectedPermission = (arrSelected: SelectedType[], checkRole: UserRoleEnum): boolean => {
  return arrSelected.every((item) => isPermission(item.userRoles) >= checkRole);
};
