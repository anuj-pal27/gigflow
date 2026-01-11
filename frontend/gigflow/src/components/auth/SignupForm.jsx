import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { Button, Input } from "../ui";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import { validateEmail, checkPasswordStrength } from "../../utils/validation";

const SignupForm = ({ onSignup, onSwitch, error, isLoading }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localErrors, setLocalErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!name || name.length < 2) errors.name = "Name must be at least 2 characters";
    if (!validateEmail(email)) errors.email = "Invalid email address";
    if (checkPasswordStrength(password) < 2) errors.password = "Password is too weak";
    if (password !== confirmPassword) errors.confirm = "Passwords do not match";

    if (Object.keys(errors).length > 0) {
      setLocalErrors(errors);
      return;
    }

    onSignup({ name, email, password });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Create Account
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Start your journey with us securely
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="John Doe"
          icon={User}
          value={name}
          onChange={(v) => {
            setName(v);
            setLocalErrors({ ...localErrors, name: "" });
          }}
          error={localErrors.name}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          value={email}
          onChange={(v) => {
            setEmail(v);
            setLocalErrors({ ...localErrors, email: "" });
          }}
          error={localErrors.email}
        />

        <Input
          label="Password"
          isPassword
          placeholder="Create a strong password"
          icon={Lock}
          value={password}
          onChange={(v) => {
            setPassword(v);
            setLocalErrors({ ...localErrors, password: "" });
          }}
          error={localErrors.password}
        />

        <PasswordStrengthMeter password={password} />

        <Input
          label="Confirm Password"
          isPassword
          placeholder="Repeat password"
          icon={Lock}
          value={confirmPassword}
          onChange={(v) => {
            setConfirmPassword(v);
            setLocalErrors({ ...localErrors, confirm: "" });
          }}
          error={localErrors.confirm}
        />

        {error && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <Button type="submit" isLoading={isLoading} className="mt-6">
          Create Account
        </Button>
      </form>

      <p className="text-center mt-6 text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{" "}
        <button
          onClick={onSwitch}
          className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
        >
          Sign in
        </button>
      </p>
    </div>
  );
};

export default SignupForm;

