import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Button, Input } from "../ui";

const LoginForm = ({ onLogin, onSwitch, error, isLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");
    if (!email || !password) {
      setLocalError("Please fill in all fields");
      return;
    }
    onLogin(email, password);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Welcome Back
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Enter your credentials to access your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          value={email}
          onChange={setEmail}
          error={localError && !email ? "Email is required" : ""}
        />

        <Input
          label="Password"
          isPassword
          placeholder="••••••••"
          icon={Lock}
          value={password}
          onChange={setPassword}
          error={localError && !password ? "Password is required" : ""}
        />

        {(error || localError) && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm text-center">
            {error || localError}
          </div>
        )}

        <Button type="submit" isLoading={isLoading}>
          Sign In
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      <p className="text-center mt-6 text-sm text-slate-500 dark:text-slate-400">
        Don&apos;t have an account?{" "}
        <button
          onClick={onSwitch}
          className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
        >
          Create one
        </button>
      </p>
    </div>
  );
};

export default LoginForm;

