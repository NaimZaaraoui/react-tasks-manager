import { IoCloseOutline } from "react-icons/io5";
import useApp from "../hooks/useApp";
import { motion } from "motion/react";

const TaskStats = () => {
  const { tasks, statsOpen, toggleStats } = useApp();

  const getStats = () => {
    if (!tasks.length)
      return <p className="text-xl uppercase tracking-widest">No tasks yet!</p>;

    const activeTasks = tasks.filter((task) => !task.completed);

    const completedTasks = tasks.filter((task) => task.completed);

    const progress = Math.floor((completedTasks.length / tasks.length) * 100);

    return (
      <div className="max-w-md w-full space-y-5 mx-auto bg-white p-6 text-sky-950">
        <h2 className="font-bold text-xl uppercase tracking-wider">
          Tasks Stats
        </h2>

        <ul className="grid gap-2">
          <li className="flex justify-between items-center">
            <span className="uppercase tracking-widest text-xs font-semibold">
              Total tasks
            </span>
            <span className="text-sky-500 font-semibold">{tasks.length}</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="uppercase tracking-widest text-xs font-semibold">
              Active tasks
            </span>
            <span className="text-sky-500 font-semibold">
              {activeTasks.length}
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span className="uppercase tracking-widest text-xs font-semibold">
              Completed tasks
            </span>
            <span className="text-sky-500 font-semibold">
              {completedTasks.length}
            </span>
          </li>
        </ul>
        <div className="w-full h-3 ring-1 ring-green-400 ring-offset-1">
          <span
            className="block h-full bg-green-400"
            style={{ width: `${progress}%` }}></span>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className="fixed inset-0 bg-sky-950/80 backdrop-blur-lg  grid place-items-center text-white"
      initial={{ x: "100%" }}
      animate={{
        x: statsOpen ? 0 : "100%",
        transition: {
          type: "tween",
          ease: "easeInOut",
        },
      }}>
      <button
        aria-label="Close stats"
        className="absolute top-4 right-4"
        onClick={() => toggleStats(false)}>
        <IoCloseOutline size={40} />
      </button>
      {getStats()}
    </motion.div>
  );
};

export default TaskStats;
