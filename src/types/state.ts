import { TaskModel } from "./task";

export interface StateModel {
  tasks: TaskModel[];
  error: string | null;
  filter: "all" | "active" | "completed";
  searchQuery: string;
  statsOpen: boolean;
}
