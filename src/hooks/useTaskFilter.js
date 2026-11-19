import { useMemo } from "react";

function useTaskFilter(tasks, searchTerm, priority) {
  return useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return tasks.filter((task) => {
      // Searching the description too is optional; the assignment only says "search text"
      const matchesSearch =
        !term ||
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term);

      const matchesPriority = !priority || task.priority === priority;

      return matchesSearch && matchesPriority;
    });
  }, [tasks, searchTerm, priority]);
}

export default useTaskFilter;