import { api } from "@/helpers/http/config.http";
import { BaseResponse } from "@/utils/types/api-base-response.type";
import { ListEntriesRESQ } from "./request/list-entries.request";
import { ListEntriesRESP } from "./response/list-entries.reponse";

export const getListEntriesMyDrive = async (param: ListEntriesRESQ) => {
  const res = await api.get<BaseResponse<ListEntriesRESP>>(`/files/${param.id}`, {
    params: { cursor: param.cusor,  limit: param.limit },
  });
  return res.data;
};

export const getSharedEntries = async (param: Pick<ListEntriesRESQ, 'id'>) => {
  const res = await api.get<BaseResponse<ListEntriesRESP>>(`/files/${param.id}/access`);
  return res.data;
}
