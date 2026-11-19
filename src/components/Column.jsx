import TaskCard from "./TaskCard";

function Column({ title, tasks, moveTask, deleteTask }) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 w-full md:w-1/3">
      <h2 className="font-bold mb-3">
        {title} ({tasks.length})
      </h2>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          moveTask={moveTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}

export default Column;