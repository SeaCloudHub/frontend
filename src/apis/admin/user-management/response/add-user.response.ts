import { IdentityRESP } from '@/apis/auth/response/auth.sign-in.response';
import { IdentityFileRESP } from './get-identities.response';

export type AddUserRESP = {
  id: string;
  email: string;
  password: string;
};
