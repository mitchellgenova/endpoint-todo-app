import Providers from "@/App/Providers";
import Navbar from "@/Components/Navbar";
import CustomErrorBoundary from "@/Components/Shared/CustomErrorBoundary";
import TodoList from "@/Components/TodoList";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";

function App() {
  return (
    <CustomErrorBoundary>
      <Providers>
        <ReactQueryDevtools />
        <div className="dark:bg-gray-600 h-full">
          <Navbar />
          <CustomErrorBoundary>
            <section className="mx-auto max-w-lg mt-4 px-5">
              <TodoList />
            </section>
          </CustomErrorBoundary>
        </div>
      </Providers>
    </CustomErrorBoundary>
  );
}

export default App;
