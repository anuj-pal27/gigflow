import { useState } from "react";
import { Loader2, ShieldCheck, Lock } from "lucide-react";
import { useAuth } from "./context/AuthContext";
import { Card } from "./components/ui";
import { LoginForm, SignupForm } from "./components/auth";
import { Dashboard } from "./components/dashboard";

function App() {
  const { user, isLoading, error, register, login, logout, clearError, isAuthenticated } = useAuth();
  const [view, setView] = useState("login"); // 'login' | 'signup'

  const handleLogin = async (email, password) => {
    const result = await login(email, password);
    if (result.success) {
      setView("login");
    }
  };

  const handleSignup = async (data) => {
    const result = await register(data);
    if (result.success) {
      setView("login");
    }
  };

  const handleLogout = async () => {
    await logout();
    setView("login");
  };

  const switchView = (newView) => {
    clearError();
    setView(newView);
  };

  // Show loading spinner while checking auth
  if (isLoading && !user && !error) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-800 dark:text-slate-100">
      {isAuthenticated ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <div className="w-full max-w-md">
          <Card className="p-8">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 transform -rotate-6">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
            </div>

            {view === "login" ? (
              <LoginForm
                onLogin={handleLogin}
                onSwitch={() => switchView("signup")}
                error={error}
                isLoading={isLoading}
              />
            ) : (
              <SignupForm
                onSignup={handleSignup}
                onSwitch={() => switchView("login")}
                error={error}
                isLoading={isLoading}
              />
            )}
          </Card>

          <p className="text-center mt-8 text-xs text-slate-400 max-w-xs mx-auto">
            <Lock className="w-3 h-3 inline mr-1" />
            Your data is encrypted and securely stored.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
