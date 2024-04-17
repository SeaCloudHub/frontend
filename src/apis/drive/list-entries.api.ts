import { api } from "@/helpers/http/config.http";
import { BaseResponse } from "@/utils/types/api-base-response.type";
import { ListEntriesREQ } from "./request/list-entries.request";
import { ListEntriesRESP } from "./response/list-entries.reponse";

export const getListEntriesMyDrive = async (param: ListEntriesREQ) => {
  const res = await api.get<BaseResponse<ListEntriesRESP>>(`/files/${param.id}`, {
    params: { cursor: param.cusor,  limit: param.limit },
  });
  return res.data;
};

export const getSharedEntries = async (param: Pick<ListEntriesREQ, 'id'>) => {
  const res = await api.get<BaseResponse<ListEntriesRESP>>(`/files/${param.id}/access`);
  return res.data;
}

// export const signinApi = async (body: AuthSignInREQ) => {
//   const res = await api.post<AuthSignInRESP>('/users/login', body, {});
//   return res.data;
// };

// export const changePasswordApi = async (body: AuthChangePasswordREQ) => {
//   const res = await api.post<BaseResponse<void>>('users/change-password', body);
//   return res.data;
// };