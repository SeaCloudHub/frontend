import dayjs from 'dayjs';
import { UserManagementInfoDto } from './dto/user-management-info.dto';
import { IdentityFileRESP } from './response/get-identities.response';

export const getIdentitiesRESToUserManagementInfoDto = (data: IdentityFileRESP): UserManagementInfoDto => {
  return {
    isAdmin: data.is_admin,
    name: (data.first_name || '') + (data.first_name && data.last_name ? ' ' : '') + (data.last_name || ''),
    usedMemory: data.storage_usage,
    totalMemory: data.storage_capacity,
    avatar: data.avatar_url ? import.meta.env.VITE_BACKEND_API + data.avatar_url : null,
    userId: data.id,
    root_id: data.root_id,
    isBlocked: data.blocked_at ? true : false,
    lastAccess: (data.last_sign_in_at && dayjs(data.last_sign_in_at).format('YYYY-MM-DD')) || '',
  };
};
