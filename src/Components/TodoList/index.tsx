import { useCallback } from "react";
import useGetTodos from "@/Hooks/useGetTodos";
import TodoItem from "@/Components/TodoList/TodoItem";
import LoadingSpinner from "@/Components/Shared/LoadingSpinner";
import useUpdateTodo from "@/Hooks/useUpdateTodo";
import { HandleCompleteTodoParams } from "@/Types";

const TodoList = () => {
  const { data, isLoading } = useGetTodos();
  const { mutate: updateTodo } = useUpdateTodo();

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col gap-3">
      {data?.ids.map((id) => (
        <TodoItem
          key={id}
          todo={data.entities[id]}
          handleCompleteTodo={handleCompleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
