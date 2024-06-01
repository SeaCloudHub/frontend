import { api } from '@/helpers/http/config.http';
import {
  CopyFileREQ,
  ListEntriesREQ,
  RenameREQ,
  UploadFileREQ,
  DeleteEntriesREQ,
  ListEntriesPageREQ,
  RestoreEntriesREQ,
  SuggestedEntriesREQ,
  StarEntriesREQ,
  SearchREQ,
  DownloadMultipleEntriesREQ,
  GetListFileSizesREQ,
  GetActivityLogREQ,
  UpdateGeneralAccessREQ,
} from './drive.request';
import { BaseResponse } from '@/utils/types/api-base-response.type';
import { MoveToTrashREQ } from './request/move-to-trash.request';
import {
  ActivityLogRESP,
  EntryMetadataRES,
  EntryRESP,
  ListEntriesPageRESP,
  ListEntriesRESP,
  SearchRESP,
  SharedEntriesRESP,
  SuggestedEntriesRESP,
} from './drive.response';
import { HTTP_HEADER } from '@/utils/constants/http.constant';
import { GetStorageRESP } from './response/get-storage.response';
import { GeneralAccessType } from '@/utils/types/general-access.type';

export const getListEntries = async (params: ListEntriesREQ) => {
  const res = await api.get<BaseResponse<ListEntriesRESP>>(`/files/${params.id}`, {
    params: { ...params, type: params.type?.toLowerCase() },
  });
  return res.data;
};

export const getListEntriesPageMyDrive = async (param: ListEntriesPageREQ) => {
  const res = await api.get<BaseResponse<ListEntriesPageRESP>>(`/files/${param.id}/page`, {
    params: { ...param, type: param.type?.toLowerCase() },
  });
  return res.data;
};

export const getListEntriesAdmin = async (param: ListEntriesPageREQ) => {
  const { id, ...rest } = param;
  const res = await api.get<BaseResponse<ListEntriesPageRESP>>(`/files/${id}/page`, {
    params: { ...rest , type: param.type?.toLowerCase() },
  });
  return res.data;
};


export const getListEntriesSuggested = async (params: SuggestedEntriesREQ) => {
  const res = await api.get<BaseResponse<SuggestedEntriesRESP[]>>(`/files/suggested`, { params });
  return res.data;
};

export const getListEntriesPageStarred = async (params?: Pick<ListEntriesREQ, 'after' | 'cursor' | 'limit' | 'type'>) => {
  const res = await api.get<BaseResponse<ListEntriesRESP>>(`/files/starred`, {
    params: { ...params, type: params.type?.toLowerCase() },
  });
  return res.data;
};

export const getListEntriesTrash = async (params?: Pick<ListEntriesREQ, 'after' | 'cursor' | 'limit' | 'type'>) => {
  const res = await api.get<BaseResponse<ListEntriesRESP>>(`/files/trash`, {
    params: { ...params, type: params.type?.toLowerCase() },
  });
  return res.data;
};

export const getSharedEntries = async (params: Pick<ListEntriesREQ, 'after' | 'cursor' | 'limit' | 'type'>) => {
  const res = await api.get<BaseResponse<SharedEntriesRESP>>(`/files/share`, {
    params: { ...params, type: params.type?.toLowerCase() },
  });
  return res.data;
};

export const getAccessEntries = async (param: Pick<ListEntriesREQ, 'id'>) => {
  const res = await api.get<BaseResponse<ListEntriesRESP>>(`/files/${param.id}/access`);
  return res.data;
};

export const copyFiles = async (body: CopyFileREQ) => {
  const res = await api.post<BaseResponse<EntryRESP[]>>(`/files/copy`, body);
  return res.data;
};

export const getEntryMetadata = async (param: Pick<ListEntriesREQ, 'id'>) => {
  const res = await api.get<BaseResponse<EntryMetadataRES>>(`/files/${param.id}/metadata`);
  return res.data;
};

export const downloadFile = async (param: { id: string; name?: string }) => {
  const res = await api.get(`/files/${param.id}/download`, { responseType: 'blob' });
  const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', param.name || param.id);
  document.body.appendChild(link);
  link.click();
};

export const uploadFiles = async (body: UploadFileREQ) => {
  const formData = new FormData();
  for (const key in body) {
    formData.append(key, body[key]);
  }
  const res = await api.post<BaseResponse<EntryRESP[]>>('/files', formData, {
    headers: HTTP_HEADER.FORM_DATA,
  });
  return res.data;
};

export const renameEntry = async (body: RenameREQ) => {
  const res = await api.patch<BaseResponse<EntryRESP>>(`/files/rename`, body);
  return res.data;
};

export const moveToTrash = async (body: MoveToTrashREQ) => {
  const res = await api.post<BaseResponse<EntryRESP[]>>(`/files/move/trash`, body);
  return res.data;
};

export const deleteEntries = async (body: DeleteEntriesREQ) => {
  const res = await api.post<BaseResponse<EntryRESP[]>>(`/files/delete`, body);
  return res.data;
};

export const restoreEntries = async (body: RestoreEntriesREQ) => {
  const res = await api.post<BaseResponse<EntryRESP[]>>(`/files/restore`, body);
  return res.data;
};

export const starEntry = async (body: StarEntriesREQ) => {
  const res = await api.patch<BaseResponse<EntryRESP>>(`/files/star`, body);
  return res.data;
};

export const unstarEntry = async (body: StarEntriesREQ) => {
  const res = await api.patch<BaseResponse<EntryRESP>>(`/files/unstar`, body);
  return res.data;
};

export const moveEntries = async (body: Required<{ id: string; to: string }> & RestoreEntriesREQ) => {
  const res = await api.post<BaseResponse<EntryRESP[]>>(`/files/move`, body);
  return res.data;
};

export const getStorage = async () => {
  const res = await api.get<BaseResponse<GetStorageRESP>>(`/files/storage`);
  return res.data;
};

export const searchEntriesApi = async (params: SearchREQ) => {
  const res = await api.get<BaseResponse<SearchRESP>>(`/files/search`, {
    params: { ...params, type: params.type?.toLowerCase() },
  });
  return res.data;
};

export const downloadMultipleEntries = async (body: DownloadMultipleEntriesREQ) => {
  const res = await api.post(`/files/download`, body, { responseType: 'blob' });
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${body.parent_id}.zip`);
  document.body.appendChild(link);
  link.click();
};

export const getListFileSizes = async (params: GetListFileSizesREQ) => {
  const res = await api.get<BaseResponse<ListEntriesRESP>>(`/files/sizes`, {
    params: { ...params, type: params.type?.toLowerCase() },
  });
  return res.data;
};

export const getActivityLog = async (params: GetActivityLogREQ) => {
  const res = await api.get<BaseResponse<ActivityLogRESP>>(`/files/${params.id}/activities`, { params });
  return res.data;
};

export const updateGeneralAccess = async (body: UpdateGeneralAccessREQ) => {
  const res = await api.patch<BaseResponse<void>>(`/files/general-access`, body);
  return res.data;
}