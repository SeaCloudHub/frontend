import { api } from '@/helpers/http/config.http';
import { BaseResponse } from '@/utils/types/api-base-response.type';
import { CreateFolderREQ } from './request/create-storage.request';
import { CreateFolderRES } from './response/create-storage.response';

export const createFolderApi = async (body: CreateFolderREQ) => {
  const res = await api.post<BaseResponse<CreateFolderRES>>('files/directories', body, {});
  return res.data;
};
