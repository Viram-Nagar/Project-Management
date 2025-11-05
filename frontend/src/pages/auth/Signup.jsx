import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { signupUser } from "../../api/userAPI";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "admin",
    password: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleInputChange(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmitSignupForm(event) {
    event.preventDefault();
    const response = await signupUser(formData);
    const { user } = response.data;
    login(user);
    navigate("/login");

    console.log(response);
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-surface px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-border p-8">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-2 text-primary mb-2">
              <UserPlus className="w-6 h-6" strokeWidth={1.75} />
              <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
                Create Your Account
              </h1>
            </div>
            <p className="text-text-secondary text-sm text-center">
              Join your team and start managing projects
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmitSignupForm}
            className="flex flex-col gap-5 text-text-primary"
          >
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-text-secondary"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-gray-400"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-text-secondary"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="w-full border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-gray-400"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-text-secondary"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full border border-border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-gray-400"
                required
              />
            </div>

            {/* Role */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="role"
                className="text-sm font-medium text-text-secondary"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full border border-border rounded-lg px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white font-medium py-2.5 rounded-lg hover:bg-primary-accent transition-colors shadow-sm"
            >
              Sign Up
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-text-secondary mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-primary hover:text-primary-accent font-medium cursor-pointer"
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
