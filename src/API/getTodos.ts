import customFetch from "../Utils/customFetch";

const getTodos = async () => {
  const todos = await customFetch({
    url: "https://b0f179aa-a791-47b5-a7ca-5585ba9e3642.mock.pstmn.io/GET",
    options: {
      method: "GET",
    },
  });

  return todos;
};

export default getTodos;
