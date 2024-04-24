import { api } from "@/helpers/http/config.http";
import { CopyFileREQ } from "./request/copy.request";
import { BaseResponse } from "@/utils/types/api-base-response.type";
import { EntryRESP } from "./response/entry.response";
import { ListEntriesREQ } from "./request/list-entries.request";
import { ListEntriesRESP } from "./response/list-entries.reponse";
import { RenameREQ } from "./request/rename.request";
import { MoveToTrashREQ } from "./request/move-to-trash.request";

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

export const renameFile = async (body: RenameREQ) => {
  const res = await api.patch<BaseResponse<EntryRESP>>(`/files/rename`, body);
  return res.data;
}

export const moveToTrash = async (body: MoveToTrashREQ) => {
  const res = await api.post<BaseResponse<EntryRESP[]>>(`/files/move/trash`, body);
  return res.data;
}