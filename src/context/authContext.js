// src/context/authContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, logoutUser, registerUser, fetchUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // carrega usuário logado ao iniciar
  useEffect(() => {
    fetchUser()
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    await loginUser(credentials);
    const u = await fetchUser();
    setUser(u);
  };

  const register = async (data) => {
    await registerUser(data);
    const u = await fetchUser();
    setUser(u);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
