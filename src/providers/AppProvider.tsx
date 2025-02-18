import { ReactNode, useEffect, useOptimistic, useReducer } from "react";
import AppContext from "../contexts/AppContext";
import appReducer from "../reducers/appReducer";
import { StateModel, TaskModel } from "../types";
import { appActions } from "../constants";
import toast from "react-hot-toast";
import { CiTrash } from "react-icons/ci";

interface Props {
  children: ReactNode;
}

const initialState: StateModel = {
  tasks: [],
  error: null,
  filter: "all",
  searchQuery: "",
  statsOpen: false,
};

const AppProvider = ({ children }: Props) => {
  const initialTasks = (() => {
    try {
      const storedTasks = localStorage.getItem("tasks");

      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        return {
          ...initialState,
          tasks: Array.isArray(parsedTasks) ? parsedTasks : [],
        };
      }
    } catch (error) {
      console.error("Failed to load tasks:", error);
      return {
        ...initialState,
        error: error instanceof Error ? error.message : "Failed to load tasks",
      };
    }

    return initialState;
  })();

  // State
  const [state, dispatch] = useReducer(appReducer, initialTasks);

  const { tasks, error, filter, searchQuery, statsOpen } = state;

  const [optimisticTasks, addOptimisticTask] = useOptimistic<
    TaskModel[],
    string
  >(tasks, (currentTasks, newTitle) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: newTitle,
      completed: false,
      pending: true,
    };
    return [...currentTasks, newTask];
  });

  // Actions
  const addTask = (title: string) => {
    dispatch({ type: appActions.ADD_TASK, payload: title });
    toast.success("Task added successfully!");
  };

  const deleteTask = (id: string) => {
    dispatch({ type: appActions.DELETE_TASK, payload: id });
    toast.success("Task removed successfully!", {
      icon: (
        <CiTrash
          size={20}
          className="text-pink-500"
        />
      ),
    });
  };

  const toggleTask = (id: string) => {
    dispatch({ type: appActions.TOGGLE_TASK, payload: id });
  };

  const setError = (error: StateModel["error"]) => {
    dispatch({ type: appActions.SET_ERROR, payload: error });
  };

  const setFilter = (filter: StateModel["filter"]) => {
    dispatch({ type: appActions.SET_FILTER, payload: filter });
  };

  const setSearchQuery = (query: string) => {
    dispatch({ type: appActions.SET_SEARCH_QUERY, payload: query });
  };

  const toggleStats = (status: boolean) => {
    dispatch({ type: appActions.TOGGLE_STATS, payload: status });
  };

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks:", error);
    }
  }, [tasks]);

  const contextValue = {
    tasks,
    optimisticTasks,
    error,
    filter,
    searchQuery,
    statsOpen,
    addTask,
    addOptimisticTask,
    deleteTask,
    toggleTask,
    setError,
    setFilter,
    setSearchQuery,
    toggleStats,
  };

  return <AppContext value={contextValue}>{children}</AppContext>;
};

export default AppProvider;
