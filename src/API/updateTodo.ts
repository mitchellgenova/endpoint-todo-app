import { UpdateTodoParams } from "@/Types";
import customFetch from "@/Utils/customFetch";

const updateTodo = ({ body, todoId }: UpdateTodoParams) => {
  return customFetch({
    url: `https://b0f179aa-a791-47b5-a7ca-5585ba9e3642.mock.pstmn.io/patch/${todoId}`,
    options: {
      method: "PATCH",
      body: JSON.stringify(body),
    },
  });
};

export default updateTodo;
