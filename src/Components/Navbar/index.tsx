import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="bg-orange-300 dark:bg-gray-700 p-4 flex items-center justify-between">
      <h1 className="text-gray-700 dark:text-white font-bold text-lg">
        Todo App
      </h1>
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
