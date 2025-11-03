import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { logoutUser } from "../api/userAPI";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const storeUser = sessionStorage.getItem("user");

    if (token && storeUser) {
      setUser(JSON.parse(storeUser));
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const login = (user, token) => {
    sessionStorage.setItem("token");
    sessionStorage.setItem("user", JSON.stringify(user));
    setUser(user);

    setToken(token);
  };

  const logout = async () => {
    await logoutUser();

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, login, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
