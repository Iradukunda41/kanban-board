const PRIORITIES = ["High", "Medium", "Low"];

function FilterBar({ searchTerm, setSearchTerm, priority, setPriority }) {
  const buttonClass = (active) =>
    `px-3 py-2 rounded border text-sm ${
      active ? "bg-blue-600 text-white border-blue-600" : "bg-white"
    }`;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search tasks..."
        className="border rounded px-3 py-2 flex-1 min-w-48"
      />

      <button
        onClick={() => setPriority("")}
        className={buttonClass(priority === "")}
      >
        All
      </button>
      {PRIORITIES.map((p) => (
        <button
          key={p}
          onClick={() => setPriority(p)}
          className={buttonClass(priority === p)}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;