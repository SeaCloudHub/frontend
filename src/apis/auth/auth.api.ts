import { HTTP_HEADER } from '@/utils/constants/http.constant';
import { api } from '../../helpers/http/config.http';
import { BaseResponse } from '../../utils/types/api-base-response.type';
import { IdentityFileRESP } from '../admin/user-management/response/get-identities.response';
import { AuthSignInREQ } from './request/auth-sign-in.request';
import { AuthChangePasswordREQ } from './request/change-password.request';
import { AuthCheckEmailRESP, AuthSignInRESP } from './response/auth.sign-in.response';
import { AuthUploadAvatarRESP } from './response/auth.upload-avatar';
import { AuthUploadAvatarREQ } from './request/auth.uploadAvatar.request';
import { AuthUpdateProfileREQ } from './request/auth.update-profile.request';

export const checkEmailApi = async (param: Pick<AuthSignInREQ, 'email'>) => {
  const res = await api.get<BaseResponse<AuthCheckEmailRESP>>(`/users/email`, { params: param });
  return res.data;
};
export const signinApi = async (body: AuthSignInREQ) => {
  const res = await api.post<BaseResponse<AuthSignInRESP>>('/users/login', body, {});
  return res.data;
};

export const changePasswordApi = async (body: AuthChangePasswordREQ) => {
  const res = await api.post<BaseResponse<void>>('users/change-password', body);
  return res.data;
};

export const signOutApi = async () => {
  const res = await api.post<BaseResponse<void>>('users/logout');
  return res.data;
};

export const getProfileApi = async () => {
  const res = await api.get<BaseResponse<IdentityFileRESP>>('/users/me');
  console.log(res.data);
  return res.data;
};

export const uploadAvatarApi = async (body: AuthUploadAvatarREQ) => {
  const formData = new FormData();
  formData.append('image', body.image);

  const res = await api.post<BaseResponse<AuthUploadAvatarRESP>>('/assets/images', formData, {
    headers: HTTP_HEADER.FORM_DATA,
  });
  return res.data;
};

export const updateProfileApi = async (body: Partial<AuthUpdateProfileREQ>) => {
  const res = await api.patch<BaseResponse<{ id: string }>>('/users/profile', body);
  return res.data;
};
