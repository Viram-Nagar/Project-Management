import { NavLink } from "react-router-dom";
import { Folder, ListTodo } from "lucide-react";

function MobileNav({ className }) {
  return (
    <nav className={`${className}`}>
      <NavLink
        to="/projects"
        className={({ isActive }) =>
          `flex flex-col justify-center items-center gap-1 text-sm font-medium transition-colors duration-200  ${
            isActive ? "text-primary" : "text-text-secondary hover:text-primary"
          }`
        }
      >
        <Folder className="h-5 w-5" strokeWidth={1.75} /> All Projects
      </NavLink>

      <NavLink
        to="/my-tasks"
        className={({ isActive }) =>
          `flex flex-col justify-center items-center gap-1 text-sm font-medium transition-colors duration-200  ${
            isActive ? "text-primary" : "text-text-secondary hover:text-primary"
          }`
        }
      >
        <ListTodo /> My Tasks
      </NavLink>
      <NavLink
        to="/invites"
        className={({ isActive }) =>
          `flex flex-col justify-center items-center gap-1 text-sm font-medium transition-colors duration-200  ${
            isActive ? "text-primary" : "text-text-secondary hover:text-primary"
          }`
        }
      >
        <ListTodo /> Invites
      </NavLink>
    </nav>
  );
}

export default MobileNav;
