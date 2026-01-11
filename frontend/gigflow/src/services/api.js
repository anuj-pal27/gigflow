import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for HttpOnly cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth API calls
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  logout: () => api.post("/auth/logout"),
  getMe: () => api.get("/auth/me"),
  updatePassword: (data) => api.put("/auth/password", data),
};

export default api;

