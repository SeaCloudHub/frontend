import { IdentityRESP } from '../../../auth/response/auth.sign-in.response';

export type IdentityFileRESP = IdentityRESP & {
  last_access_at: string;
  maximum_capacity: number;
  used_capacity: number;
};

export type GetIdentitiesRESP = {
  identities: IdentityFileRESP[];
  next_token: string;
};
