import updateTodo from "@/API/updateTodo/updateTodo";
import { NormalizedTodosType, UpdateTodoParams } from "@/Types";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { getTodosQuery } from "./useGetTodos";
import { produce } from "immer";

interface OnMutateReturn {
  previousTodos: NormalizedTodosType | undefined;
}

type UseUpdateTodoParams = Omit<
  UseMutationOptions<unknown, Error, UpdateTodoParams, OnMutateReturn>,
  "mutationFn"
>;

const useUpdateTodo = ({
  ...options
}: UseUpdateTodoParams = {}): UseMutationResult<
  unknown,
  Error,
  UpdateTodoParams,
  OnMutateReturn
> => {
  const queryClient = useQueryClient();
  const { queryKey } = getTodosQuery();

  return useMutation({
    mutationFn: updateTodo,
    onMutate: async ({ todoId, body }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousTodos = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldTodos) => {
        if (oldTodos) {
          const updatedTodos = produce(oldTodos, (draft) => {
            draft.entities[todoId] = {
              ...draft.entities[todoId],
              ...body,
            };
          });

          return updatedTodos;
        }

        return oldTodos;
      });

      return { previousTodos };
    },
    onError: (_, __, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(queryKey, context.previousTodos);
      }
    },
    onSettled: () => {
      /*
        You want to invalidate here to refetch in the background
        This makes the server the source of truth
        However, since this is mock data, refetching would override the UI state by resetting the todo list back to the initial state
      */
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    ...options,
  });
};

export default useUpdateTodo;
