import { api } from '@/helpers/http/config.http';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

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
