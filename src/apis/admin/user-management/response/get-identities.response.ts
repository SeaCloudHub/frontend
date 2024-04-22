import { PaginationRESP } from '@/utils/types/api-base-response.type';
import { IdentityRESP } from '../../../auth/response/auth.sign-in.response';

export type IdentityFileRESP = IdentityRESP;

export type GetIdentitiesRESP = {
  identities: IdentityFileRESP[];
  pagination: PaginationRESP;
};
