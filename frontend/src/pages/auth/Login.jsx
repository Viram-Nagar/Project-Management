import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { loginUser } from "../../api/userAPI";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  function handleInputChange(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmitLoginForm(event) {
    event.preventDefault();

    const response = await loginUser(formData);

    const { user, message } = response.data;
    if (user) {
      login(user);
      navigate("/projects");
    }

    console.log(response);

    if (message) {
      setMessage(message);
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-surface px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-border p-8">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-2 text-primary mb-2">
              <LogIn className="w-6 h-6" strokeWidth={1.75} />
              <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
                Welcome Back
              </h1>
            </div>
            <p className="text-text-secondary text-sm text-center">
              Sign in to continue to your workspace
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmitLoginForm}
            className="flex flex-col gap-5 text-text-primary"
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-text-secondary"
              >
                Email
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

            <button
              type="submit"
              className="w-full bg-primary text-white font-medium py-2.5 rounded-lg hover:bg-primary-accent transition-colors shadow-sm"
            >
              Log In
            </button>
          </form>

          {message && <p className="text-error mt-3">{message}</p>}

          {/* Footer */}
          <p className="text-center text-sm text-text-secondary mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-primary hover:text-primary-accent font-medium cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
