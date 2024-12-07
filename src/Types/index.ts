export interface TodoItemType {
  id: string;
  description: string;
  isComplete: boolean;
  dueDate: string | null;
}

export interface NormalizedTodosType {
  ids: string[];
  entities: Record<string, TodoItemType>;
}

export interface UpdateTodoParams {
  body: Pick<TodoItemType, "isComplete">;
  todoId: string;
}

export interface HandleCompleteTodoParams {
  todoId: string;
  isComplete: boolean;
}
