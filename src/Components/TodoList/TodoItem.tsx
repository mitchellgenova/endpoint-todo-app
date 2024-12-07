import { TodoItemType } from "../../Types";

interface TodoItemProps {
  handleCompleteTodo: (id: string) => void;
  todo: TodoItemType;
}

const getTodoBackgroundColor = (todo: TodoItemType) => {
  if (todo.isComplete) {
    return "bg-green-300";
  }
  if (todo.dueDate && new Date(todo.dueDate) < new Date()) {
    return "bg-red-300";
  }
  return "bg-gray-300";
};

const TodoItem = ({ handleCompleteTodo, todo }: TodoItemProps) => {
  return (
    <div className={getTodoBackgroundColor(todo)}>
      <input
        type="checkbox"
        onClick={() => handleCompleteTodo(todo.id)}
        checked={todo.isComplete}
      />
      <span>{todo.description}</span>
      <span>{todo.dueDate}</span>
    </div>
  );
};

export default TodoItem;
