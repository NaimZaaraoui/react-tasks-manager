import { appActions } from "../constants";

export type AppActionModel =
  | { type: appActions.ADD_TASK; payload: string }
  | { type: appActions.DELETE_TASK; payload: string }
  | { type: appActions.TOGGLE_TASK; payload: string }
  | { type: appActions.SET_ERROR; payload: string | null }
  | { type: appActions.SET_FILTER; payload: "all" | "active" | "completed" }
  | { type: appActions.SET_SEARCH_QUERY; payload: string }
  | { type: appActions.TOGGLE_STATS; payload: boolean };
