import { Link } from "react-router-dom";

function ArchivePage({ tasks, updateTask }) {
  const archived = tasks.filter((t) => t.archived);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Archive</h1>

      {archived.length === 0 && (
        <p className="text-gray-500">No archived tasks yet.</p>
      )}

      {archived.map((task) => (
        <div
          key={task.id}
          className="bg-white rounded-lg shadow p-3 mb-3 flex items-center justify-between"
        >
          <Link to={`/task/${task.id}`} className="hover:underline">
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.status}</p>
          </Link>
          <button
            onClick={() => updateTask(task.id, { archived: false })}
            className="text-sm text-blue-600"
          >
            Restore
          </button>
        </div>
      ))}
    </div>
  );
}

export default ArchivePage;