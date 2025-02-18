import { createContext } from "react";
import { OptimisticTaskModel, TaskModel } from "../types";

interface AppContextModel {
  tasks: TaskModel[];
  optimisticTasks: OptimisticTaskModel[];
  error: string | null;
  filter: "all" | "active" | "completed";
  searchQuery: string;
  statsOpen: boolean;
  addTask: (title: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setError: (error: AppContextModel["error"]) => void;
  setFilter: (filter: AppContextModel["filter"]) => void;
  setSearchQuery: (query: string) => void;
  toggleStats: (status: boolean) => void;
  addOptimisticTask: (title: string) => void;
}

const AppContext = createContext<AppContextModel | null>(null);

export default AppContext;
