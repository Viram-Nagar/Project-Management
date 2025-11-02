import TaskEditForm from "./TaskEditForm";
import { CSS } from "@dnd-kit/utilities";
import { ArrowRight, Calendar, User } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function TaskCard({ task, projectId }) {
  // const { user } = useAuth();
  const navigate = useNavigate();

  function handleTaskDetials() {
    navigate(`/projects/${projectId}/tasks/${task._id}`);
  }

  function getStatusColor() {
    switch (task.status) {
      case "Todo":
        return "border-warning/60";
      case "In Progress":
        return "border-primary/60";
      case "Done":
        return "border-success/60";
      default:
        return "border-border";
    }
  }

  return (
    <div
      key={task._id}
      className={`bg-surface border-l-4 ${getStatusColor()} border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer`}
    >
      <h4 className="font-semibold text-text-primary text-base mb-2 truncate">
        {task.title}
      </h4>
      <div className="flex flex-col gap-2 text-xs text-text-secondary">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-text-secondary" />
          <span className="font-medium text-text-primary">
            {new Date(task.dueDate).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
        {task.assignedTo?.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <User className="w-3.5 h-3.5 text-text-secondary" />
            <div className="flex flex-wrap gap-1">
              {task.assignedTo.map((member) => (
                <span
                  key={member._id}
                  className="text-xs  font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                >
                  {member.name}
                </span>
              ))}
            </div>
          </div>
        )}{" "}
      </div>
      <div className="flex justify-end mt-3">
        <button
          onClick={handleTaskDetials}
          className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition-colors text-sm font-medium"
        >
          Details <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
