import { useCallback, useEffect } from "react";
import TodoItem from "./TodoItem";
import getTodos from "../../API/getTodos";

const TodoList = () => {
  // GET Todos
  // Create function for updating Todos, useCallback for memoization

  const handleCompleteTodo = useCallback((todoId: string) => {
    // Call API to update Todo
    console.log(todoId);
  }, []);

  useEffect(() => {
    getTodos().then((todos) => {
      console.log(todos);
    });
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <TodoItem
        todo={{
          id: "1",
          description: "Learn React",
          isComplete: false,
          dueDate: "2021-10-01",
        }}
        handleCompleteTodo={handleCompleteTodo}
      />
    </div>
  );
};

export default TodoList;
