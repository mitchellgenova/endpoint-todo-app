import { describe, it, expect, vi, Mock } from "vitest";
import updateTodo from "@/API/updateTodo/updateTodo";
import customFetch from "@/Utils/customFetch/customFetch";
import { UpdateTodoParams } from "@/Types";

vi.mock("@/Utils/customFetch/customFetch");

describe("updateTodo", () => {
  it("updates todo successfully", async () => {
    const mockResponse = { success: true };
    const updateParams: UpdateTodoParams = {
      body: { isComplete: true },
      todoId: "1",
    };

    (customFetch as Mock).mockResolvedValue(mockResponse);

    const response = await updateTodo(updateParams);

    expect(response).toEqual(mockResponse);
    expect(customFetch).toHaveBeenCalledWith({
      url: `https://b0f179aa-a791-47b5-a7ca-5585ba9e3642.mock.pstmn.io/patch/${updateParams.todoId}`,
      options: {
        method: "PATCH",
        body: JSON.stringify(updateParams.body),
      },
    });
  });

  it("handles update error", async () => {
    const errorMessage = "Failed to update todo";
    const updateParams: UpdateTodoParams = {
      body: { isComplete: true },
      todoId: "1",
    };

    (customFetch as Mock).mockRejectedValue(new Error(errorMessage));

    await expect(updateTodo(updateParams)).rejects.toThrow(errorMessage);
  });
});
