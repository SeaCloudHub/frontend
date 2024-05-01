export type BaseResponse<T> = {
  message: string;
  data: T;
};

export type PaginationRESP = {
  total_items: number | null;
  total_pages: number | null;
  current_page: number | null;
  next_page: number | null;
  previous_page: null | number;
  first_page: number | null;
  last_page: number | null;
  limit: number;
};
