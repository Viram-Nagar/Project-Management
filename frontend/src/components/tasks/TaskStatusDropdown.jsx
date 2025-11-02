import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function TaskStatusDropdown({ taskId, task, updateTaskStatus }) {
  const [open, setOpen] = useState(false);
  const statuses = ["Todo", "In Progress", "Done"];

  const handleStatusChange = (newStatus) => {
    setOpen(false);
    if (newStatus !== task.status) {
      updateTaskStatus(taskId, newStatus);
    }
  };

  // optional: colors for badges
  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
  };

  return (
    <div className="relative inline-block text-left">
      {/* Current status button */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
          statusColors[task.status]
        } hover:opacity-80 transition`}
      >
        {task.status}
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 w-40 rounded-lg shadow-lg bg-white ring-1 ring-gray-200 z-20">
          <ul className="py-1">
            {statuses.map((s) => (
              <li
                key={s}
                onClick={() => handleStatusChange(s)}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                  s === task.status
                    ? "font-semibold text-gray-700"
                    : "text-gray-600"
                }`}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
