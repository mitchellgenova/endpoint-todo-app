import { describe, it, expect, vi, Mock } from "vitest";
import getTodos from "@/API/getTodos/getTodos";
import customFetch from "@/Utils/customFetch/customFetch";
import { TodoItemType } from "@/Types";

vi.mock("@/Utils/customFetch/customFetch");

describe("getTodos", () => {
  it("fetches todos successfully", async () => {
    const mockTodos: TodoItemType[] = [
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

    (customFetch as Mock).mockResolvedValue(mockTodos);

    const todos = await getTodos();

    expect(todos).toEqual(mockTodos);
    expect(customFetch).toHaveBeenCalledWith({
      url: "https://b0f179aa-a791-47b5-a7ca-5585ba9e3642.mock.pstmn.io/GET",
      options: {
        method: "GET",
      },
    });
  });

  it("handles fetch error", async () => {
    const errorMessage = "Failed to fetch todos";
    (customFetch as Mock).mockRejectedValue(new Error(errorMessage));

    await expect(getTodos()).rejects.toThrow(errorMessage);
  });
});
