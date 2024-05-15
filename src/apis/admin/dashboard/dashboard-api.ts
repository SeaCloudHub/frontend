import { api } from '@/helpers/http/config.http';
import { BaseResponse } from '@/utils/types/api-base-response.type';
import { StorageLogREQ } from './request/dashboard.request';
import { StatisticRESP, StorageLogRESP } from './response/dashboard.response';

export const userStatisticApi = async () => {
  const res = await api.get<BaseResponse<StatisticRESP>>(`/admin/statistics`);
  return res.data.data;
};

export const storageLogApi = async (param: StorageLogREQ) => {
  const res = await api.get<BaseResponse<StorageLogRESP>>(`/admin/logs`, { params: param });
  return res.data.data;
};
