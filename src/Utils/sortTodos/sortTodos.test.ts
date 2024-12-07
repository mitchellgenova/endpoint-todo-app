import { describe, expect, it } from "vitest";
import sortTodos from "./sortTodos";
import { TodoItemType } from "@/Types";

describe("sortTodos", () => {
  it("overdue items are first", () => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const todos: TodoItemType[] = [
      {
        id: "1",
        description: "Eat some food",
        dueDate: new Date().toISOString(),
        isComplete: false,
      },
      {
        id: "2",
        description: "Take a shower",
        dueDate: oneDayAgo.toISOString(),
        isComplete: false,
      },
    ];

    const sortedTodos = sortTodos(todos);

    expect(sortedTodos[0].id).toBe("2");
  });

  it("overdue items are sorted by most overdue", () => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

    const todos: TodoItemType[] = [
      {
        id: "1",
        description: "Eat some food",
        dueDate: oneDayAgo.toISOString(),
        isComplete: false,
      },
      {
        id: "2",
        description: "Take a shower",
        dueDate: twoDaysAgo.toISOString(),
        isComplete: false,
      },
    ];

    const sortedTodos = sortTodos(todos);

    expect(sortedTodos[0].id).toBe("2");
  });

  it("non-overdue incomplete items are sorted by soonest due date", () => {
    const todos: TodoItemType[] = [
      {
        id: "1",
        description: "Eat some food",
        dueDate: new Date().toISOString(),
        isComplete: false,
      },
      {
        id: "2",
        description: "Take a shower",
        dueDate: new Date().toISOString(),
        isComplete: false,
      },
    ];

    const sortedTodos = sortTodos(todos);

    expect(sortedTodos[0].id).toBe("2");
  });

  it("completed items should be last", () => {
    const todos: TodoItemType[] = [
      {
        id: "1",
        description: "Eat some food",
        dueDate: new Date().toISOString(),
        isComplete: true,
      },
      {
        id: "2",
        description: "Take a shower",
        dueDate: new Date().toISOString(),
        isComplete: false,
      },
    ];

    const sortedTodos = sortTodos(todos);

    expect(sortedTodos[1].id).toBe("1");
  });

  it("null dueDates come last in the category", () => {
    const todos: TodoItemType[] = [
      {
        id: "1",
        description: "Eat some food",
        dueDate: null,
        isComplete: false,
      },
      {
        id: "2",
        description: "Take a shower",
        dueDate: new Date().toISOString(),
        isComplete: false,
      },
    ];

    const sortedTodos = sortTodos(todos);

    expect(sortedTodos[1].id).toBe("1");
  });
});
