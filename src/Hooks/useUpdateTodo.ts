import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import updateTodo from "../API/updateTodo";
import { NormalizedTodosType, UpdateTodoParams } from "../Types";
import sortTodos from "../Utils/sortTodos";

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

  return useMutation({
    mutationFn: updateTodo,
    onMutate: async ({ todoId, body }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<NormalizedTodosType>([
        "todos",
      ]);

      queryClient.setQueryData<NormalizedTodosType>(["todos"], (oldTodos) => {
        if (oldTodos) {
          // This can be greatly simplified by using Immer
          const updatedTodos = {
            ...oldTodos,
            entities: {
              ...oldTodos.entities,
              [todoId]: {
                ...oldTodos.entities[todoId],
                ...body,
              },
            },
          };

          const sortedIds = sortTodos(
            updatedTodos.ids.map((id) => updatedTodos.entities[id])
          );
          updatedTodos.ids = sortedIds.map((todo) => todo.id);

          return updatedTodos;
        }

        return oldTodos;
      });

      return { previousTodos };
    },
    onError: (_, __, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
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
