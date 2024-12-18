import { queryOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";
import getTodos from "@/API/getTodos/getTodos";
import { NormalizedTodosType } from "@/Types";
import sortTodos from "@/Utils/sortTodos/sortTodos";

export const getAndNormalizeTodos = async () => {
  const todos = await getTodos();

  const sortedTodos = sortTodos(todos);

  const normalizedTodos = sortedTodos.reduce<NormalizedTodosType>(
    (acc, item) => {
      acc.ids.push(item.id);
      acc.entities[item.id] = item;
      return acc;
    },
    { ids: [], entities: {} }
  );

  return normalizedTodos;
};

type UseGetTodosProps<T> = Omit<
  UseQueryOptions<NormalizedTodosType, Error, T>,
  "queryKey" | "queryFn"
>;

export const getTodosQuery = <T = NormalizedTodosType>() =>
  queryOptions<NormalizedTodosType, Error, T>({
    queryKey: ["todos"],
    queryFn: getAndNormalizeTodos,
  });

const useGetTodos = <T = NormalizedTodosType>({
  ...options
}: UseGetTodosProps<T> = {}) => useQuery({ ...getTodosQuery<T>(), ...options });

export default useGetTodos;
