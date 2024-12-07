import { TodoItemType } from "../../Types";

interface TodoItemProps {
  handleCompleteTodo: (id: string) => void;
  todo: TodoItemType;
}

const TodoItem = ({ handleCompleteTodo, todo }: TodoItemProps) => {
  return (
    <div>
      <input type="checkbox" onClick={() => handleCompleteTodo(todo.id)} />
      <span>{todo.description}</span>
    </div>
  );
};

export default TodoItem;
