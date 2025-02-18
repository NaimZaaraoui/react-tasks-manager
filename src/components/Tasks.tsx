import { MdAssignmentAdd } from "react-icons/md";
import useApp from "../hooks/useApp";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { motion } from "motion/react";
import TaskFilters from "./TaskFilters";

const Tasks = () => {
  const { tasks, optimisticTasks } = useApp();

  return (
    <motion.div
      className="space-y-6 max-w-md mx-auto"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 1, type: "tween", ease: "easeIn" },
      }}>
      <div className="grid gap-2 justify-center">
        <h2 className="uppercase font-black text-xl tracking-widest bg-gradient-to-l from-pink-500 to-sky-500 inline-block text-transparent bg-clip-text text-center">
          Tasks Manager App UI
        </h2>
      </div>
      <TaskForm />
      {tasks.length > 0 && <TaskFilters />}
      {optimisticTasks.length ? (
        <TaskList />
      ) : (
        <div className="grid gap-4 text-center justify-center place-items-center">
          <p className="text-lg text-sky-950">Your tasks list is empty!</p>
          <MdAssignmentAdd size={30} />
        </div>
      )}
    </motion.div>
  );
};

export default Tasks;
