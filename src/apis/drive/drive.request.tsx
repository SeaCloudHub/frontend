import { api } from '@/helpers/http/config.http';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ListEntriesResponse } from './drive.model';
import { BaseResponse } from '@/utils/types/api-base-response.type';

type State = 'all' | 'open' | 'done';
type Todo = {
  id: number;
  state: State;
};
type Todos = ReadonlyArray<Todo>;

export const listEntriesQuery = (dirId: string, filter: string, sort: string, order: string) => {
  return useQuery({
    queryKey: ['entries', dirId, filter, sort, order],
    queryFn: () =>
      api
        .get<BaseResponse<ListEntriesResponse>>(`files/${dirId}`, { params: { limit: 100 } })
        .then((res) => res.data.data.entries),
  });
};
