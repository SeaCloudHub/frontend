import { PaginationRESP } from '@/utils/types/api-base-response.type';
import { PagingState } from '@/utils/types/paging-stage.type';

export const paginationRESPToDto = (res: PaginationRESP) => {
  return {
    page: res.current_page || 1,
    size: res.limit || 10,
    totalPage: res.total_pages || 0,
    count: res.total_items || 0,
  } as PagingState;
};
