import { BsSearch } from "react-icons/bs";
import useApp from "../hooks/useApp";
import { FilterModel } from "../types";
import { ChangeEvent } from "react";

const TaskFilters = () => {
  const { filter, searchQuery, setFilter, setSearchQuery } = useApp();

  const filterItems = ["all", "active", "completed"].map((item) => (
    <li key={item}>
      <button
        className={`text-xs uppercase tracking-wider font-semibold px-3 py-1.5 transition-colors ${
          item === filter
            ? "bg-sky-600 text-white"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
        onClick={() => setFilter(item as FilterModel)}>
        {item}
      </button>
    </li>
  ));

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-4">
      <ul className="flex gap-3">{filterItems}</ul>
      <div className="relative">
        <input
          type="text"
          className="w-full px-10 py-2 bg-gray-50 border focus:outline-none focus:ring-2 focus:ring-sky-600/50 focus:ring-offset-2"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskFilters;
