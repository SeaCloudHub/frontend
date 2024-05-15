import { api } from '@/helpers/http/config.http';
import { BaseResponse } from '@/utils/types/api-base-response.type';
import { StatisticRESP } from './response/dashboard.response';

export const userStatisticApi = async () => {
  const res = await api.get<BaseResponse<StatisticRESP>>(`/admin/statistics`);
  return res.data.data;
};
