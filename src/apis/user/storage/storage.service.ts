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
      user_id: item.user_id,
      name: (item.first_name || '') + (item.first_name && item.last_name ? ' ' : '') + (item.last_name || ''),
      email: item.email,
      avatar: item.avatar_url ? import.meta.env.VITE_BACKEND_API + item.avatar_url : '',
      role: roleInfo ? roleInfo.value : 'Unknown',
    };
  });
};
