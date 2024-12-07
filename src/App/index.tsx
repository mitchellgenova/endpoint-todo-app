import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navbar from "../Components/Navbar";
import TodoList from "../Components/TodoList";
import Providers from "./Providers";
import "./index.css";

function App() {
  return (
    <Providers>
      <ReactQueryDevtools />
      <div>
        <Navbar />
        <TodoList />
      </div>
    </Providers>
  );
}

export default App;
