import { Role } from '../enums/role.enum';

export const accountAuthorityCallback: { [key in Role]: string } = {
  ADMIN: '/admin',
  USER: '/drive',
};
