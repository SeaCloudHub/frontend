import { api } from '@/helpers/http/config.http';
import { HTTP_HEADER } from '@/utils/constants/http.constant';
import { objectToFormData } from '@/utils/parser/http.parser';
import { BaseResponse } from '@/utils/types/api-base-response.type';
import { CreateFolderREQ, UploadFileREQ } from './request/create-storage.request';
import { CreateFolderRES } from './response/create-storage.response';

export const createFolderApi = async (body: CreateFolderREQ) => {
  const res = await api.post<BaseResponse<CreateFolderRES>>('files/directories', body, {});
  return res.data;
};

export const uploadFilesApi = async (body: UploadFileREQ) => {
  const res = await api.post<BaseResponse<CreateFolderRES[]>>('files', objectToFormData(body), {
    headers: { ...HTTP_HEADER.FORM_DATA },
  });
  return res.data;
};
