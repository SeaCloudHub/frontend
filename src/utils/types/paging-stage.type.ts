export type PagingState = {
  page: number;
  size: number;
  count?: number;
  totalPage: number;
};

export const initialPagingState: PagingState = {
  page: 1,
  size: 20,
  totalPage: 1,
};
