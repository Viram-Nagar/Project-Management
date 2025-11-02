// components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { Folder, ListTodo } from "lucide-react";

export default function Sidebar({ className }) {
  return (
    <aside className={` flex flex-col rounded-r-xl ${className}`}>
      <h1 className="text-xl font-semibold tracking-tight text-primary mb-8">
        Team<span className="text-primary-accent">Tasker</span>
      </h1>
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              isActive
                ? "bg-primary text-white shadow-sm"
                : "text-text-secondary hover:bg-primary/10 hover:text-primary"
            }`
          }
        >
          <Folder className="w-5 h-5" strokeWidth={1.75} /> All Projects
        </NavLink>

        <NavLink
          to="/my-tasks"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              isActive
                ? "bg-primary text-white shadow-sm"
                : "text-text-secondary hover:bg-primary/10 hover:text-primary"
            }`
          }
        >
          <ListTodo className="w-5 h-5" strokeWidth={1.75} /> My Tasks
        </NavLink>
        <NavLink
          to="/invites"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              isActive
                ? "bg-primary text-white shadow-sm"
                : "text-text-secondary hover:bg-primary/10 hover:text-primary"
            }`
          }
        >
          <ListTodo className="w-5 h-5" strokeWidth={1.75} /> Invites
        </NavLink>
      </nav>
    </aside>
  );
}
