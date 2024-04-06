import { api } from '../../helpers/http/config.http';
import { BaseResponse } from '../../utils/types/api-base-response.type';
import { AuthSignInREQ } from './request/auth-sign-in.request';
import { AuthChangePasswordREQ } from './request/change-password.request';
import { AuthCheckEmailRESP, AuthSignInRESP } from './response/auth.sign-in.response';

export const checkEmailApi = async (param: Pick<AuthSignInREQ, 'email'>) => {
  const res = await api.get<BaseResponse<AuthCheckEmailRESP>>(`/users/email`, { params: param });
  return res.data;
};
export const signinApi = async (body: AuthSignInREQ) => {
  const res = await api.post<AuthSignInRESP>('/users/login', body, {});
  return res.data;
};

export const changePasswordApi = async (body: AuthChangePasswordREQ) => {
  const res = await api.post<BaseResponse<void>>('users/change-password', body);
  return res.data;
};
