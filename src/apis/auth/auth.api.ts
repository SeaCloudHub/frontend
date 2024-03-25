import { api } from '../../helpers/http/config.http';
import { AuthSignInREQ } from './request/auth-sign-in.request';
import { AuthSignInRESP } from './response/auth.sign-in.response';

export const signinApi = async (body: AuthSignInREQ) => {
  const res = await api.post<AuthSignInRESP>('/users/login', body, {});
  return res;
};
