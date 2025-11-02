import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Header({ className }) {
  const { user, logout } = useAuth();
  return (
    <header
      className={` flex items-center justify-between px-4 sm:px-6 py-3 bg-white border-b border-gray-100 ${className}`}
    >
      <h1 className="text-2xl font-semibold tracking-tight text-rich-black">
        TASK<span className="text-primary">ATION</span>
      </h1>

      {user ? (
        <NavLink
          to="/login"
          className="px-4 py-2 bg-primary rounded-xl text-white hover:bg-primary-accent transition-colors duration-200 font-medium"
          onClick={logout}
        >
          Logout
        </NavLink>
      ) : (
        <div className="flex gap-4">
          <NavLink
            to="/signup"
            className="px-4 py-2 bg-primary rounded-xl text-white hover:bg-primary-accent transition duration-200 font-medium"
          >
            Signup
          </NavLink>
          <NavLink
            to="/login"
            className="px-4 py-2 rounded-xl text-primary border border-primary hover:bg-primary hover:text-white transition duration-200"
          >
            Login
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;
