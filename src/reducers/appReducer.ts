import { appActions } from "../constants";
import { AppActionModel, StateModel, TaskModel } from "../types";

export default function (state: StateModel, action: AppActionModel) {
  switch (action.type) {
    case appActions.ADD_TASK: {
      const title = action.payload;

      const newTask: TaskModel = {
        id: crypto.randomUUID(),
        title,
        completed: false,
      };

      const tasks = [...state.tasks, newTask];

      return { ...state, tasks };
    }

    case appActions.DELETE_TASK: {
      const id = action.payload;

      const tasks = state.tasks.filter((task) => task.id !== id);

      return { ...state, tasks };
    }

    case appActions.TOGGLE_TASK: {
      const id = action.payload;

      const tasks = state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );

      return { ...state, tasks };
    }

    case appActions.SET_ERROR: {
      return { ...state, error: action.payload };
    }

    case appActions.SET_FILTER: {
      return { ...state, filter: action.payload };
    }

    case appActions.SET_SEARCH_QUERY: {
      return { ...state, searchQuery: action.payload };
    }

    case appActions.TOGGLE_STATS: {
      return { ...state, statsOpen: action.payload };
    }

    default: {
      return state;
    }
  }
}
