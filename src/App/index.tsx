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
        <section className="mx-auto max-w-lg mt-4 px-5">
          <TodoList />
        </section>
      </div>
    </Providers>
  );
}

export default App;
