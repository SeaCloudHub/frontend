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

const fetchTodos = async (state: State): Promise<Todos> => {
  const response = await axios.get(`todos/${state}`);
  return response.data;
};

export const useTodosQuery = (state: State) =>
  useQuery({
    queryKey: ['todos', state],
    queryFn: () => fetchTodos(state),
    // initialData: () => {
    //   const allTodos = queryClient.getQueryData<Todos>([
    //     'todos',
    //     'all',
    //   ])
    //   const filteredData =
    //     allTodos?.filter((todo) => todo.state === state) ?? []

    //   return filteredData.length > 0 ? filteredData : undefined
    // },
  });

const usePasteItems = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, dest }: { id: string; dest: string }) => api.get(`drive/copy`, { params: { id, dest } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
  });

  return mutation;
};

export const listEntriesApi = (dirId: string, filter: string, sort: string, order: string) => {
  return useQuery({
    queryKey: ['entries', dirId, filter, sort, order],
    queryFn: () => api.get<BaseResponse<ListEntriesResponse>>(`files/${dirId}`).then((res) => res.data.data.entries),
  });
};
