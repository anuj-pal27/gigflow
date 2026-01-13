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
    <div className="animate-in">
      <div className="mb-8">
        <h2 className="text-4xl font-black text-black uppercase italic mb-2">
          Welcome Back
        </h2>
        <div className="h-2 w-20 bg-pink-500 border-2 border-black rounded-full"></div>
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
          <div className="p-3 bg-red-100 border-2 border-red-500 rounded-xl text-red-700 font-bold text-sm flex items-center gap-2">
            <span className="text-xl">!</span> {error || localError}
          </div>
        )}

        <Button type="submit" isLoading={isLoading} className="w-full text-lg h-14">
          ENTER DASHBOARD
          <ArrowRight className="w-5 h-5" />
        </Button>
      </form>

      <div className="mt-8 text-center text-sm font-bold">
        New here?{" "}
        <button
          onClick={onSwitch}
          className="text-pink-600 underline decoration-2 decoration-wavy hover:text-pink-700"
        >
          Create an account
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
