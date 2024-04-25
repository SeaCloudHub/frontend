import dayjs from 'dayjs';
import { UserManagementInfoDto } from './dto/user-management-info.dto';
import { IdentityFileRESP } from './response/get-identities.response';

export const getIdentitiesRESToUserManagementInfoDto = (data: IdentityFileRESP): UserManagementInfoDto => {
  console.log(data.last_sign_in_at);
  return {
    name: data.first_name + ' ' + data.last_name,
    usedMemory: data.storage_usage,
    totalMemory: data.storage_capacity,
    avatar: data.avatar_url,
    userId: data.id,
    lastAccess: (data.last_sign_in_at && dayjs(data.last_sign_in_at).format('YYYY-MM-DD')) || '',
  };
};
