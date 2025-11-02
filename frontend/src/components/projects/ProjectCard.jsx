import { ListTodo, User, UserCircle2 } from "lucide-react";
import { deleteProject } from "../../api/projectAPI";

function ProjectCard({
  title,
  admin,
  members,
  onProjectInfo,
  projectId,
  tasks,
  user,
}) {
  async function handleDeleteProject(id) {
    await deleteProject(id);
  }

  return (
    <div className="bg-white border border-border/60 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between gap-4">
      <h2 className="text-lg font-semibold text-text-primary tracking-tight line-clamp-1">
        {title}
      </h2>

      <div className="flex items-center justify-between text-sm text-text-secondary flex-wrap sm:flex-nowrap gap-1">
        <p className="flex items-center gap-1 min-w-0 truncate">
          <UserCircle2
            className="w-4 h-4 text-primary flex-shrink-0"
            strokeWidth={1.75}
          />
          <span>
            <span className="font-medium text-text-primary truncate">
              {admin}
            </span>
          </span>
        </p>
        <p className="flex items-center gap-1 min-w-0 truncate">
          <User
            className="w-4 h-4 text-primary flex-shrink-0"
            strokeWidth={1.75}
          />
          <span>
            <span className="font-medium text-text-primary truncate">
              {members}
            </span>
            &nbsp;members
          </span>
        </p>
      </div>
      <div className="flex justify-between">
        <p className="flex items-center gap-1 min-w-0 truncate text-sm">
          <ListTodo
            className="w-4 h-4 text-primary flex-shrink-0"
            strokeWidth={1.75}
          />
          <span>
            <span className="font-medium text-text-primary truncate">
              {tasks}
            </span>
            &nbsp;tasks
          </span>
        </p>
        <div className="flex justify-end gap-2">
          {user.role === "admin" && (
            <button
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-error text-white hover:bg-error/80 transition-colors duration-200"
              onClick={() => handleDeleteProject(projectId)}
            >
              Delete
            </button>
          )}

          <button
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary-accent transition-colors duration-200"
            onClick={() => onProjectInfo(projectId)}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
