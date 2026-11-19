import { useState } from "react";
import Column from "../components/Column";
import FilterBar from "../components/FilterBar";
import useTaskFilter from "../hooks/useTaskFilter";

const COLUMNS = ["To Do", "In Progress", "Done"];

function BoardPage({ tasks, addTask, moveTask, deleteTask }) {
  const [title, setTitle] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [searchTerm, setSearchTerm] = useState("");
  const [priority, setPriority] = useState("");

  const activeTasks = tasks.filter((t) => !t.archived);
  const filteredTasks = useTaskFilter(activeTasks, searchTerm, priority);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({
      title: title.trim(),
      description: "",
      status: "To Do",
      priority: newPriority,
    });
    setTitle("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>

      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        priority={priority}
        setPriority={setPriority}
      />

      {/* Optional add-task form */}
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task title"
          className="border rounded px-3 py-2 flex-1 min-w-48"
        />
        <select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button className="bg-blue-600 text-white rounded px-4 py-2">
          Add Task
        </button>
      </form>

      <div className="flex flex-col md:flex-row gap-4">
        {COLUMNS.map((status) => (
          <Column
            key={status}
            title={status}
            tasks={filteredTasks.filter((t) => t.status === status)}
            moveTask={moveTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default BoardPage;