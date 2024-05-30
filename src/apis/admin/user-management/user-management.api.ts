import { IdentityRESP } from '../../../apis/auth/response/auth.sign-in.response';
import { api } from '../../../helpers/http/config.http';
import { objectToFormData } from '../../../utils/parser/http.parser';
import { BaseResponse } from '../../../utils/types/api-base-response.type';
import { ImportExcelREQ } from './request/add-user-excel.request';
import { AddUserREQ } from './request/add-user.request';
import { GetIdentitiesREQ, GetUserDetailREQ } from './request/get-identities.request';
import { ResetPasswordREQ } from './request/reset-password.request';
import { AdminUpdateUserREQ } from './request/update-user.request';
import { UserBlockREQ, UserDeleteREQ } from './request/user-action.request';
import { AddUserRESP } from './response/add-user.response';
import { GetIdentitiesRESP } from './response/get-identities.response';
import { ResetPasswordRESP } from './response/reset-password.response';

export const addUserApi = async (body: AddUserREQ) => {
  const res = await api.post<BaseResponse<AddUserRESP>>('admin/identities', body, {});
  return res.data;
};

export const importExcelApi = async (body: ImportExcelREQ) => {
  const res = await api.post<BaseResponse<IdentityRESP[]>>('admin/identities/bulk', objectToFormData(body));
  return res.data;
};

export const downloadTemplateCSV = async () => {
  const res = await api.get<Blob>('/admin/identities/template', { responseType: 'blob' });
  return res;
};

export const getIdentititesApi = async (param: GetIdentitiesREQ) => {
  const res = await api.get<BaseResponse<GetIdentitiesRESP>>('admin/identities', { params: param });
  return res.data.data;
};

export const deleteUserAPi = async (param: UserDeleteREQ) => {
  const res = await api.delete<BaseResponse<void>>(`admin/identities/${param.identity_id}`);
  return res.data.data;
};

export const blockUserApi = async (param: UserBlockREQ) => {
  const res = await api.patch<BaseResponse<void>>(`admin/identities/${param.identity_id}/state`);
  return res.data.data;
};

export const getUserDetailApi = async (param: GetUserDetailREQ) => {
  const res = await api.get<BaseResponse<IdentityRESP>>(`admin/identities/${param.identity_id}`);
  return res.data.data;
};

export const updateUserApi = async (data: { body: AdminUpdateUserREQ; userId: string }) => {
  const { body, userId } = data;
  const res = await api.patch<BaseResponse<IdentityRESP>>(`admin/identities/${userId}`, body);
  return res.data.data;
};

export const resetPasswordApi = async ( param: ResetPasswordREQ) => {
  const res = await api.patch<BaseResponse<ResetPasswordRESP>>(`admin/identities/${param.identity_id}/reset-password`);
  return res.data.data;
}; 
