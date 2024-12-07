import { useCallback } from "react";
import useGetTodos from "../../Hooks/useGetTodos";
import TodoItem from "./TodoItem";
import LoadingSpinner from "../Shared/LoadingSpinner";

const TodoList = () => {
  // Create function for updating Todos, useCallback for memoization

  const handleCompleteTodo = useCallback((todoId: string) => {
    // Call API to update Todo
    console.log(todoId);
  }, []);

  const { data, isLoading } = useGetTodos();

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
