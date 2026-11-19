import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const STATUSES = ["To Do", "In Progress", "Done"];
const PRIORITIES = ["High", "Medium", "Low"];

function TaskDetailPage({ tasks, updateTask, deleteTask }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return (
      <div className="p-6">
        <p className="mb-3">Task not found.</p>
        <Link to="/" className="text-blue-600 underline">
          Back to board
        </Link>
      </div>
    );
  }

  return <EditForm task={task} updateTask={updateTask} deleteTask={deleteTask} navigate={navigate} />;
}

function EditForm({ task, updateTask, deleteTask, navigate }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const [archived, setArchived] = useState(task.archived);

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    updateTask(task.id, {
      title: title.trim(),
      description,
      status,
      priority,
      archived,
    });
    navigate("/");
  };

  const handleDelete = () => {
    deleteTask(task.id);
    navigate("/");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Link to="/" className="text-blue-600 underline">
        ← Back to board
      </Link>
      <h1 className="text-2xl font-bold my-4">Edit Task</h1>

      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="border rounded px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          Status
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded px-3 py-2"
          >
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>

        {/* Optional: priority and archive controls */}
        <label className="flex flex-col gap-1">
          Priority
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border rounded px-3 py-2"
          >
            {PRIORITIES.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={archived}
            onChange={(e) => setArchived(e.target.checked)}
          />
          Archived
        </label>

        <div className="flex gap-3">
          <button className="bg-blue-600 text-white rounded px-4 py-2">
            Save
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white rounded px-4 py-2"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskDetailPage;