import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "./context/AuthContext";
import Home from "./components/Home";
import {
  RoleSelectPage,
  AuthPage,
  ClientDashboard,
  FreelancerDashboard,
} from "./pages";

function App() {
  const {
    user,
    isLoading,
    error,
    register,
    login,
    logout,
    clearError,
    isAuthenticated,
  } = useAuth();

  // View states: 'home' | 'role-select' | 'auth'
  const [view, setView] = useState("home");
  // Auth mode: 'login' | 'signup'
  const [authMode, setAuthMode] = useState("login");
  // Selected role: 'client' | 'freelancer'
  const [selectedRole, setSelectedRole] = useState(null);

  // Handle login with backend
  const handleLogin = async (email, password, role) => {
    const result = await login(email, password);
    if (result?.success) {
      // Store role in localStorage for persistence
      localStorage.setItem("userRole", role);
      setSelectedRole(role);
    }
  };

  // Handle signup with backend
  const handleSignup = async (data) => {
    const result = await register(data);
    if (result?.success) {
      localStorage.setItem("userRole", data.role);
      setSelectedRole(data.role);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("userRole");
    setSelectedRole(null);
    setView("home");
  };

  // Navigate to role selection
  const goToRoleSelect = (mode) => {
    clearError();
    setAuthMode(mode);
    setView("role-select");
  };

  // Select role and go to auth
  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setView("auth");
  };

  // Go back from auth to role select
  const handleAuthBack = () => {
    clearError();
    setView("role-select");
  };

  // Switch between login/signup
  const handleSwitchAuthMode = () => {
    clearError();
    setAuthMode(authMode === "login" ? "signup" : "login");
  };

  // Handle back from role select
  const handleRoleSelectBack = (targetView) => {
    clearError();
    if (targetView === "login" || targetView === "signup") {
      setAuthMode(targetView);
    } else {
      setView("home");
    }
  };

  // Loading state
  if (isLoading && !user && !error) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-pink-500 animate-spin mx-auto mb-4" />
          <p className="font-black text-black uppercase">Loading...</p>
        </div>
      </div>
    );
  }

  // Authenticated - show appropriate dashboard
  if (isAuthenticated && user) {
    const role = selectedRole || localStorage.getItem("userRole") || "client";

    if (role === "freelancer") {
      return <FreelancerDashboard user={user} onLogout={handleLogout} />;
    }
    return <ClientDashboard user={user} onLogout={handleLogout} />;
  }

  // Home page
  if (view === "home") {
    return (
      <Home
        onLogin={() => goToRoleSelect("login")}
        onSignup={() => goToRoleSelect("signup")}
      />
    );
  }

  // Role selection page
  if (view === "role-select") {
    return (
      <RoleSelectPage
        onSelectRole={handleSelectRole}
        onBack={handleRoleSelectBack}
        isSignup={authMode === "signup"}
      />
    );
  }

  // Auth page (login/signup)
  if (view === "auth") {
    return (
      <AuthPage
        mode={authMode}
        role={selectedRole}
        onAuth={authMode === "login" ? handleLogin : handleSignup}
        onSwitchMode={handleSwitchAuthMode}
        onBack={handleAuthBack}
        error={error}
        isLoading={isLoading}
      />
    );
  }

  return null;
}

export default App;
