import { Link } from "react-router-dom";

const STATUSES = ["To Do", "In Progress", "Done"];

function TaskCard({ task, moveTask, deleteTask }) {
  const priorityColors = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  return (
    <div className="bg-white rounded-lg shadow p-3 mb-3">
      <Link to={`/task/${task.id}`} className="block hover:underline">
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
      </Link>

      <span
        className={`inline-block mt-2 text-xs px-2 py-1 rounded ${priorityColors[task.priority]}`}
      >
        {task.priority}
      </span>

      <div className="flex items-center gap-2 mt-3">
        <select
          value={task.status}
          onChange={(e) => moveTask(task.id, e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          onClick={() => deleteTask(task.id)}
          className="text-sm text-red-600 ml-auto"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;