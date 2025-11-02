import { Clock, Circle, CheckCircle } from "lucide-react";
import TaskCard from "./TaskCard";

function ColumnStatus({ title, tasks, projectId }) {
  function getColunmStyle() {
    switch (title) {
      case "Todo":
        return {
          icon: <Circle className="w-4 h-4 text-warning" strokeWidth={2} />,
          color: "text-warning",
          border: "border-warning/30",
        };
      case "In Progress":
        return {
          icon: <Clock className="w-4 h-4 text-primary" strokeWidth={2} />,
          color: "text-primary",
          border: "border-primary/30",
        };
      case "Done":
        return {
          icon: (
            <CheckCircle className="w-4 h-4 text-success" strokeWidth={2} />
          ),
          color: "text-success",
          border: "border-success/30",
        };
      default:
        return {
          icon: (
            <Circle className="w-4 h-4 text-text-secondary" strokeWidth={2} />
          ),
          color: "text-text-secondary",
          border: "border-border",
        };
    }
  }

  const { icon, color, border } = getColunmStyle();

  return (
    <div
      className={`min-w-[320px] sm:min-w-[360px] max-w-sm flex-1 bg-white border  ${border} rounded-lg p-4 shadow-sm snap-start`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon}
          <h3
            className={`font-semibold ${color} text-sm uppercase tracking-wide`}
          >
            {title}
          </h3>
        </div>
        <span className="text-sm text-text-primary font-medium">
          {tasks?.length || 0} task{tasks?.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {tasks?.length > 0 ? (
          tasks?.map((task) => (
            <TaskCard key={task._id} task={task} projectId={projectId} />
          ))
        ) : (
          <div className="text-sm text-text-secondary italic bg-surface border border-border border-dashed rounded-md p-3  text-center">
            No task yet
          </div>
        )}
      </div>
    </div>
  );
}

export default ColumnStatus;
