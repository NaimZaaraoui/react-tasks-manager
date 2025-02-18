import { useActionState, useEffect, useRef } from "react";
import useApp from "../hooks/useApp";
import toast from "react-hot-toast";

const TaskForm = () => {
  const { addTask, setError, addOptimisticTask } = useApp();

  const [state, formAction, isPending] = useActionState(
    async (_prevState: unknown, formData: FormData) => {
      const title = formData.get("task-title") as string;
      addOptimisticTask(title);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const lengthMatch = title.length >= 3 && title.length <= 30;

      if (title && lengthMatch) {
        addTask(title);
      } else {
        setError("Task title should be 3 to 30 characters.");
        toast.error("Task title should be 3 to 30 characters.");
        return { title, error: true };
      }
    },
    null
  );

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state?.error) {
      inputRef.current?.focus();
    }
  }, [state]);

  return (
    <form
      className="max-w-md mx-auto grid gap-4"
      action={formAction}>
      <div className="grid gap-3">
        <label
          htmlFor="task"
          className="text-sm uppercase text-gray-700 tracking-wider font-semibold">
          Add new task:
        </label>
        <input
          ref={inputRef}
          defaultValue={state?.title}
          type="text"
          className={`px-4 py-3 border focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-600/50 focus-within:ring-offset-2`}
          id="task"
          name="task-title"
          placeholder="e.g. Learn React hooks."
          disabled={isPending}
        />
      </div>
      <button
        className="px-5 py-3 text-xs uppercase tracking-widest bg-gradient-to-r from-pink-600 to-sky-600 text-white font-semibold w-fit disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isPending}>
        {isPending ? "Adding..." : "Add task"}
      </button>
    </form>
  );
};

export default TaskForm;
