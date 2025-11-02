import React from "react";

const TaskFilters = ({ filters, onFilterChange }) => {
  return (
    <div className="flex gap-3 bg-white border border-border rounded-lg shadow-sm px-4 py-2">
      <select
        value={filters.status}
        onChange={(e) =>
          onFilterChange((prev) => ({ ...prev, status: e.target.value }))
        }
        className="border border-border rounded-md px-3 py-2 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none bg-surface"
      >
        <option value="">All Statuses</option>
        <option value="Todo">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Completed</option>
      </select>

      {/* <input
        type="text"
        placeholder="Filter by Project"
        value={filters.project}
        onChange={(e) =>
          onFilterChange((prev) => ({ ...prev, project: e.target.value }))
        }
      /> */}
    </div>
  );
};

export default TaskFilters;
