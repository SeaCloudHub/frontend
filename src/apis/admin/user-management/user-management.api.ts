import { IdentityRESP } from '../../../apis/auth/response/auth.sign-in.response';
import { api } from '../../../helpers/http/config.http';
import { objectToFormData } from '../../../utils/parser/http.parser';
import { BaseResponse } from '../../../utils/types/api-base-response.type';
import { ImportExcelREQ } from './request/add-user-excel.request';
import { AddUserREQ } from './request/add-user.request';
import { GetIdentitiesREQ } from './request/get-identities.request';
import { AddUserRESP } from './response/add-user.response';
import { GetIdentitiesRESP } from './response/get-identities.response';

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
