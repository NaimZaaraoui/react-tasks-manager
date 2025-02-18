import { IoIosCheckmark } from "react-icons/io";
import { TaskModel } from "../types";
import { IoTrashBinOutline } from "react-icons/io5";
import useApp from "../hooks/useApp";
import { motion } from "motion/react";

interface Props {
  readonly task: TaskModel;
}

function TaskItem({ task }: Props) {
  const { id, title, completed } = task;

  const { deleteTask, toggleTask } = useApp();

  return (
    <motion.div
      initial={{ x: 50 }}
      animate={{ x: 0 }}
      className={`flex items-center gap-2 px-3 py-2 ${
        completed ? "bg-sky-100" : "bg-gray-100"
      } ${"pending" in task && task.pending ? "opacity-50" : ""}`}>
      <label
        aria-label="Toggle completed"
        className="size-5 rounded-full border grid place-center cursor-pointer group has-checked:border-sky-500 has-checked:bg-sky-500 has-checked:text-white transition-all">
        <input
          type="checkbox"
          name="completed"
          className="appearance-none peer"
          onChange={() => toggleTask(id)}
          checked={completed}
        />
        <IoIosCheckmark
          size={20}
          className="opacity-0 peer-checked:opacity-100"
        />
      </label>
      <p className="flex-1">{title}</p>
      <div className="flex items-center">
        <button
          aria-label="Delete task"
          className="ml-auto"
          onClick={() => deleteTask(id)}>
          <IoTrashBinOutline size={20} />
        </button>
      </div>
    </motion.div>
  );
}

export default TaskItem;
