import { HandleCompleteTodoParams, TodoItemType } from "@/Types";
import { dateFormatter } from "@/Utils/dates/dates";
import { memo, useMemo } from "react";

interface TodoItemProps {
  handleCompleteTodo: (params: HandleCompleteTodoParams) => void;
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

const TodoItem = memo(({ handleCompleteTodo, todo }: TodoItemProps) => {
  const formattedDueDate = useMemo(() => {
    if (todo.dueDate) {
      const date = new Date(todo.dueDate);
      return dateFormatter.format(date);
    }

    return null;
  }, [todo.dueDate]);

  return (
    <div
      className={`flex justify-between p-2 rounded gap-2 ${getTodoBackgroundColor(
        todo
      )}`}
    >
      <div className="flex gap-2 flex-1 items-center overflow-hidden group">
        <input
          id="completeTodo"
          className="w-6 h-6 group-hover:cursor-pointer"
          type="checkbox"
          onChange={() =>
            handleCompleteTodo({
              todoId: todo.id,
              isComplete: !todo.isComplete,
            })
          }
          checked={todo.isComplete}
        />
        <label htmlFor="completeTodo" className="group-hover:cursor-pointer">
          <span className={`truncate ${todo.isComplete ? "line-through" : ""}`}>
            {todo.description}
          </span>
        </label>
      </div>
      {formattedDueDate && (
        <span className="border border-gray-600 px-2 rounded">
          {formattedDueDate}
        </span>
      )}
    </div>
  );
});

export default TodoItem;
