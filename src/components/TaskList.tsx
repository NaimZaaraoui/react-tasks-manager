import useApp from "../hooks/useApp";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { filter, searchQuery, optimisticTasks } = useApp();

  // Filter tasks based on completion status
  const filteredTasks = optimisticTasks.filter((task) => {
    switch (filter) {
      case "all":
        return true;
      case "active":
        return !task.completed;
      case "completed":
        return task.completed;
      default:
        return true;
    }
  });

  // Filter tasks based on search query
  const searchedTasks = filteredTasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get empty state message based on filters
  const getEmptyStateMessage = () => {
    if (searchQuery) {
      return (
        <p className="text-gray-500">
          No tasks match your search "{searchQuery}"
        </p>
      );
    }
    if (filter !== "all") {
      return <p className="text-gray-500">No {filter} tasks</p>;
    }
    return <p>No tasks yet</p>;
  };

  // Handle empty state after filtering
  if (searchedTasks.length === 0) {
    return <div className="py-6 text-center">{getEmptyStateMessage()}</div>;
  }

  const taskItems = searchedTasks.map((task) => (
    <li key={task.id}>
      <TaskItem task={task} />
    </li>
  ));

  return <ul className="grid gap-2">{taskItems}</ul>;
};

export default TaskList;
