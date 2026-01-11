import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Check if user is already logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await authAPI.getMe();
      if (response.data.success) {
        setUser(response.data.data.user);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await authAPI.register(data);
      if (response.data.success) {
        setUser(response.data.data.user);
        return { success: true };
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "Registration failed";
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await authAPI.login({ email, password });
      if (response.data.success) {
        setUser(response.data.data.user);
        return { success: true };
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "Login failed";
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setError("");
    }
  };

  const clearError = () => setError("");

  const value = {
    user,
    isLoading,
    error,
    register,
    login,
    logout,
    clearError,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

