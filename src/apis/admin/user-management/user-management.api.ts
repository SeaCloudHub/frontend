import { api } from '../../../helpers/http/config.http';
import { BaseResponse } from '../../../utils/types/api-base-response.type';
import { AddUserREQ } from './request/add-user.request';
import { AddUserRESP } from './response/add-user.response';

export const addUserApi = async (body: AddUserREQ) => {
  const res = await api.post<BaseResponse<AddUserRESP>>('admin/identities', body, {});
  return res.data;
};
