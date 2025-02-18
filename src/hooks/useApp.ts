import { use } from "react";
import AppContext from "../contexts/AppContext";

export default function () {
  const context = use(AppContext);

  if (!context) {
    throw new Error("useApp() hook must be used within an AppProvider.");
  }

  return context;
}
