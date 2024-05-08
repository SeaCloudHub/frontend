import { api } from '@/helpers/http/config.http';
import { CopyFileREQ, ListEntriesREQ, RenameREQ, UploadFileREQ, DeleteEntriesREQ, ListEntriesPageREQ, RestoreEntriesREQ } from './drive.request';
import { BaseResponse } from '@/utils/types/api-base-response.type';
import { MoveToTrashREQ } from './request/move-to-trash.request';
import {
  EntryMetadataRES,
  EntryRESP,
  ListEntriesPageRESP,
  ListEntriesRESP,
  SharedEntriesRESP,
} from './drive.response';
import { HTTP_HEADER } from '@/utils/constants/http.constant';

export const getListEntries = async (param: ListEntriesREQ) => {
  const res = await api.get<BaseResponse<ListEntriesRESP>>(`/files/${param.id}`, {
    params: { cursor: param.cusor, limit: param.limit },
  });
  return res.data;
};

export const getListEntriesPageMyDrive = async (param: ListEntriesPageREQ) => {
  const res = await api.get<BaseResponse<ListEntriesPageRESP>>(`/files/${param.id}/page`, {
    params: { page: param.page, limit: param.limit },
  });
  return res.data;
};

// export const getListEntriesPriority = async (param: ListEntriesREQ) => {
//   const res = await api.get<BaseResponse<ListEntriesRESP>>(`/files/priority`, {
//     params: { cursor: param.cusor, limit: param.limit },
//   });
//   return res.data;
// }

export const getListEntriesPageStarred = async () => {
  const res = await api.get<BaseResponse<EntryRESP[]>>(`/files/starred`);
  return res.data;
}

export const getListEntriesTrash = async (param: ListEntriesREQ) => {
  const res = await api.get<BaseResponse<ListEntriesRESP>>(`/files/starred`, {
    params: { cursor: param.cusor, limit: param.limit },
  });
  return res.data;
};

export const getSharedEntries = async () => {
  const res = await api.get<BaseResponse<SharedEntriesRESP>>(`/files/share`);
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
  // console.log('[getEntryMetadata] param', `/files/${param.id}/metadata`)
  const res = await api.get<BaseResponse<EntryMetadataRES>>(`/files/${param.id}/metadata`);
  return res.data;
};

export const downloadFile = async (param: { id: string; name?: string }) => {
  const res = await api.get(`/files/${param.id}/download`, { responseType: 'blob' });
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', param.name || param.id);
  document.body.appendChild(link);
  link.click();
};

export const uploadFiles = async (body: UploadFileREQ) => {
  // TODO: doesnt work
  const formData = new FormData();
  for (const key in body) {
    console.log('[uploadFiles] key', key, body[key]);
    formData.append(key, body[key]);
  }
  const res = await api.post<BaseResponse<EntryRESP[]>>('/files', formData, {
    headers: HTTP_HEADER.FORM_DATA,
  });
  console.log('[uploadFiles] res', res);
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
}

export const starEntry = async (param: Pick<ListEntriesREQ, 'id'>) => {
  const res = await api.patch<BaseResponse<EntryRESP>>(`/files/${param.id}/star`);
  return res.data;
}

export const unstarEntry = async (param: Pick<ListEntriesREQ, 'id'>) => {
  const res = await api.patch<BaseResponse<EntryRESP>>(`/files/${param.id}/unstar`);
  return res.data;
}

export const moveEntries = async (body: Required<{id: string, to: string}>&RestoreEntriesREQ) => {
  const res = await api.post<BaseResponse<EntryRESP[]>>(`/files/move`, body);
  return res.data;
}
