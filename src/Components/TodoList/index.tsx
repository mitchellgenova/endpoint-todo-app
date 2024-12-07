import LoadingSpinner from "@/Components/Shared/LoadingSpinner";
import TodoItem from "@/Components/TodoList/TodoItem";
import useGetTodos from "@/Hooks/useGetTodos";
import useUpdateTodo from "@/Hooks/useUpdateTodo";
import { HandleCompleteTodoParams } from "@/Types";
import debounce from "lodash.debounce";
import { useCallback, useMemo } from "react";

const TodoList = () => {
  const { data, isLoading } = useGetTodos();
  const { mutate: updateTodo } = useUpdateTodo();

  console.log(data);

  const handleCompleteTodo = useCallback(
    ({ todoId, isComplete }: HandleCompleteTodoParams) => {
      updateTodo({
        body: {
          isComplete,
        },
        todoId,
      });
    },
    [updateTodo]
  );

  const debouncedHandleCompleteTodo = useMemo(
    () =>
      debounce(
        ({ todoId, isComplete }) => {
          handleCompleteTodo({ todoId, isComplete });
        },
        200,
        {
          leading: true,
          trailing: false,
        }
      ),
    [handleCompleteTodo]
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col gap-3">
      {data?.ids.map((id) => (
        <TodoItem
          key={id}
          todo={data.entities[id]}
          handleCompleteTodo={debouncedHandleCompleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
