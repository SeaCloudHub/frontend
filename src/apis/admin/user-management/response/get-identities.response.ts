import { PaginationRESP } from '@/utils/types/api-base-response.type';
import { IdentityRESP } from '../../../auth/response/auth.sign-in.response';
import { EntryRESP, ListEntriesPageRESP } from '@/apis/drive/drive.response';

export type IdentityFileRESP = IdentityRESP;

export type GetIdentitiesRESP = {
  identities: IdentityFileRESP[];
  pagination: PaginationRESP;
};

export type GetUserFileDetailRESP = ListEntriesPageRESP;
