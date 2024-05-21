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
};
