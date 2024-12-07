import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import getTodos from "../API/getTodos";
import { NormalizedTodosType } from "../Types";
import sortTodos from "../Utils/sortTodos";

const getAndNormalizeTodos = async () => {
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

const useGetTodos = <T = NormalizedTodosType>({
  ...options
}: UseGetTodosProps<T> = {}) =>
  useQuery({ queryKey: ["todos"], queryFn: getAndNormalizeTodos, ...options });

export default useGetTodos;
