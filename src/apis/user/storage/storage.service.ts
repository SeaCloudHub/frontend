import { RoleUser } from '@/apis/drive/drive.response';

const roleInfoDto = [
  { key: 'owner', value: 'Owner' },
  { key: 'editor', value: 'Editor' },
  { key: 'viewer', value: 'Viewer' },
];
export const convertUserFileRoleInf = (userRoles: RoleUser[]) => {
  return userRoles.map((item) => {
    const roleInfo = roleInfoDto.find((role) => role.key === item.role);
    return {
      name: item.user_id,
      email: item.user_id,
      avatar: '',
      role: roleInfo ? roleInfo.value : 'Unknown',
    };
  });
};
