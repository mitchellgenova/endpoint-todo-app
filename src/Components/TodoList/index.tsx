import { useCallback } from "react";
import useGetTodos from "../../Hooks/useGetTodos";
import TodoItem from "./TodoItem";
import LoadingSpinner from "../Shared/LoadingSpinner";
import useUpdateTodo from "../../Hooks/useUpdateTodo";

const TodoList = () => {
  const { data, isLoading } = useGetTodos();
  const { mutate } = useUpdateTodo();

  const handleCompleteTodo = useCallback(
    (todoId: string) => {
      mutate({
        body: {
          isComplete: true,
        },
        todoId,
      });
    },
    [mutate]
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>Todo List</h1>
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
