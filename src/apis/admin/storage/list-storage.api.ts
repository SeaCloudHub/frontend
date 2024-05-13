import { api } from '@/helpers/http/config.http';
import { ListStoragesREQ } from './request/list-storage.request';
import { BaseResponse } from '@/utils/types/api-base-response.type';
import { ListStoragesRESP } from './response/list-storage.response';

export const listStorages = async (param: ListStoragesREQ) => {
  const res = await api.get<BaseResponse<ListStoragesRESP>>(`/admin/storages`, {
    params: { limit: param.limit, page: param.page },
  });
  return res.data;
};
