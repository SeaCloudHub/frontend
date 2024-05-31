import { TypeEntry } from '@/apis/drive/drive.request';

export type GetIdentitiesREQ = {
  limit: number;
  page: number;
  keyword: string;
};

export type GetUserDetailREQ = {
  identity_id: string;
};

export type GetUserFileDetailREQ = {
  identity_id: string;
  limit: number;
  page: number;
  after?: string;
  type?: TypeEntry;
  query?: string;
};
