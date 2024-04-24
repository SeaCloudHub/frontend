import { api } from "@/helpers/http/config.http";
import { CopyFileREQ, ListEntriesREQ, RenameREQ, UploadFileREQ } from "./drive.request";
import { BaseResponse } from "@/utils/types/api-base-response.type";
import { MoveToTrashREQ } from "./request/move-to-trash.request";
import { EntryMetadataRES, EntryRESP, ListEntriesRESP } from "./drive.response";

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
  // console.log('[getEntryMetadata] param', `/files/${param.id}/metadata`)
  const res = await api.get<BaseResponse<EntryMetadataRES>>(`/files/${param.id}/metadata`);
  return res.data;
}

export const downloadFile = async (param: {id: string, name?: string}) => {
  const res = await api.get(`/files/${param.id}/download`, { responseType: 'blob' });
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', param.name||param.id);
  document.body.appendChild(link);
  link.click();
}

export const uploadFiles = async (body: UploadFileREQ) => { // TODO: doesnt work
  const formData = new FormData()
  for (const key in body) {
    console.log("[uploadFiles] key", key, body[key])
    formData.append(key, body[key]);
  }
  const res = await api.post<BaseResponse<EntryRESP[]>>('/files', formData, {
    headers : HTTP_HEADER.FORM_DATA,
  });
  console.log('[uploadFiles] res', res)
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