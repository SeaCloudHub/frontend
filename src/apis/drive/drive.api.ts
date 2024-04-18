import { api } from "@/helpers/http/config.http";
import { CopyFileREQ } from "./request/copy.request";
import { BaseResponse } from "@/utils/types/api-base-response.type";
import { EntryRESP } from "./response/entry.response";
import { ListEntriesREQ } from "./request/list-entries.request";
import { ListEntriesRESP } from "./response/list-entries.reponse";

export const getListEntriesMyDrive = async (param: ListEntriesREQ) => {
  const res = await api.get<BaseResponse<ListEntriesRESP>>(`/files/${param.id}`, {
    params: { cursor: param.cusor, limit: param.limit },
  });
  return res.data;
};

export const getSharedEntries = async (param: Pick<ListEntriesREQ, 'id'>) => {
  const res = await api.get<BaseResponse<ListEntriesRESP>>(`/files/${param.id}/access`);
  return res.data;
};

export const copyFiles = async (body: CopyFileREQ) => {
  const res = await api.post<BaseResponse<EntryRESP[]>>(`/files/copy`, body);
  return res.data;
};

export const getEntryMetadata = async (param: Pick<ListEntriesREQ, 'id'>) => {
  console.log('[getEntryMetadata] param', `/files/${param.id}/metadata`)
  const res = await api.get<BaseResponse<EntryRESP>>(`/files/${param.id}/metadata`);
  return res.data;
}