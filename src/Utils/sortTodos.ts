import { TodoItemType } from "../Types";

const sortTodos = (todos: TodoItemType[]) =>
  [...todos].sort((todoA, todoB) => {
    // Step 1: Handle overdue items
    const isOverdueA =
      todoA.dueDate &&
      new Date(todoA.dueDate) < new Date() &&
      !todoA.isComplete;
    const isOverdueB =
      todoB.dueDate &&
      new Date(todoB.dueDate) < new Date() &&
      !todoB.isComplete;

    if (isOverdueA && !isOverdueB) return -1;
    if (!isOverdueA && isOverdueB) return 1;

    // Step 2: Handle incomplete items (not completed)
    const isIncompleteA = !todoA.isComplete && todoA.dueDate !== null;
    const isIncompleteB = !todoB.isComplete && todoB.dueDate !== null;

    if (isIncompleteA && !isIncompleteB) return -1;
    if (!isIncompleteA && isIncompleteB) return 1;

    // Step 3: Handle completed items
    const isCompleteA = todoA.isComplete;
    const isCompleteB = todoB.isComplete;

    if (isCompleteA && !isCompleteB) return 1;
    if (!isCompleteA && isCompleteB) return -1;

    // Step 4: Handle null dueDate (null items come last in their category)
    if (todoA.dueDate === null && todoB.dueDate !== null) return 1;
    if (todoB.dueDate === null && todoA.dueDate !== null) return -1;

    return 0; // If all else is equal, no change in order
  });

export default sortTodos;