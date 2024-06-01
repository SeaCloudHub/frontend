import { api } from '@/helpers/http/config.http';
import { HTTP_HEADER } from '@/utils/constants/http.constant';
import { objectToFormData } from '@/utils/parser/http.parser';
import { BaseResponse } from '@/utils/types/api-base-response.type';
import { CreateFolderREQ, UpdateGeneralAccessREQ, UploadFileREQ } from './request/create-storage.request';
import { CreateFolderRES } from './response/create-storage.response';
import { AccessFileREQ, ShareFileREQ, SharedUsersSearchREQ } from './request/share.request';
import { SharedUsersSearchRESP } from './response/share.response';
import { UpdateAccessREQ } from './request/update-access.request';

export const createFolderApi = async (body: CreateFolderREQ) => {
  const res = await api.post<BaseResponse<CreateFolderRES>>('files/directories', body, {});
  return res.data;
};

export const uploadFilesApi = async (body: UploadFileREQ) => {
  const res = await api.postForm<BaseResponse<CreateFolderRES[]>>('files', objectToFormData(body), {
    headers: { ...HTTP_HEADER.FORM_DATA },
  });
  return res.data;
};

export const downloadFileApi = async (id: string) => {
  const res = await api.get<Blob>(`/files/${id}/download`, { responseType: 'blob' });
  return res;
};

export const sharedUserApi = async (param: SharedUsersSearchREQ) => {
  const res = await api.get<BaseResponse<SharedUsersSearchRESP>>('/users/suggest', { params: param });
  return res.data;
};

export const shareFileAPi = async (body: ShareFileREQ) => {
  const res = await api.post<BaseResponse<SharedUsersSearchRESP>>('/files/share', body);
  return res.data;
};

export const accessFileAPi = async (body: AccessFileREQ) => {
  const res = await api.get<BaseResponse<void>>(`/files/${body.id}/access`);
  return res.data;
};

export const updateGeneralAccessApi = async (body: UpdateGeneralAccessREQ) => {
  const res = await api.get<BaseResponse<void>>(`/files/${body.id}/access`);
  return res.data;
};

export const updateAccessApi = async (body: UpdateAccessREQ) => {
  const res = await api.patch<BaseResponse<void>>(`/files/access`, body);
  return res.data;
}