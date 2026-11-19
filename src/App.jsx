import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import BoardPage from "./pages/BoardPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import ArchivePage from "./pages/ArchivePage";
import useLocalStorage from "./hooks/useLocalStorage";
import { initialTasks } from "./data/initialTasks";

const STORAGE_KEY = "kanban-tasks";

function App() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, null);
  const isLoading = tasks === null;

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) !== null) return;

    const timer = setTimeout(() => {
      setTasks(initialTasks);
    }, 400);

    return () => clearTimeout(timer);
  }, [setTasks]);

  const addTask = (task) => {
    setTasks((prev) => [
      ...(prev ?? []),
      { id: Date.now(), archived: false, ...task },
    ]);
  };

  const moveTask = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const updateTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading your board...</div>
    );
  }

  return (
    <>
      <nav className="flex gap-4 px-6 py-3 bg-gray-800 text-white">
        <Link to="/">Board</Link>
        <Link to="/archive">Archive</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <BoardPage
              tasks={tasks}
              addTask={addTask}
              moveTask={moveTask}
              deleteTask={deleteTask}
            />
          }
        />
        <Route
          path="/task/:id"
          element={
            <TaskDetailPage
              tasks={tasks}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          }
        />
        <Route
          path="/archive"
          element={<ArchivePage tasks={tasks} updateTask={updateTask} />}
        />
      </Routes>
    </>
  );
} 

export default App;