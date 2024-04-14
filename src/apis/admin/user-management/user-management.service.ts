import dayjs from 'dayjs';
import { UserManagementInfoDto } from './dto/user-management-info.dto';
import { IdentityFileRESP } from './response/get-identities.response';

export const getIdentitiesRESToUserManagementInfoDto = (data: IdentityFileRESP): UserManagementInfoDto => {
  return {
    name: data.first_name + ' ' + data.last_name,
    usedMemory: data.used_capacity,
    avatar: data.avatar_url,
    userId: data.id,
    lastAccess: dayjs(data.last_access_at).format('YYYY-MM-DD') || '',
  };
};
