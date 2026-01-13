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
    <div className="animate-in">
      <div className="mb-8">
        <h2 className="text-4xl font-black text-black uppercase italic mb-2">
          Join GigFlow
        </h2>
        <div className="h-2 w-20 bg-pink-500 border-2 border-black rounded-full"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="Jane Doe"
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
          <div className="p-3 bg-red-100 border-2 border-red-500 rounded-xl text-red-700 font-bold text-sm flex items-center gap-2">
            <span className="text-xl">!</span> {error}
          </div>
        )}

        <Button type="submit" isLoading={isLoading} className="w-full text-lg h-14 mt-6">
          CREATE ACCOUNT
        </Button>
      </form>

      <div className="mt-8 text-center text-sm font-bold">
        Already have an account?{" "}
        <button
          onClick={onSwitch}
          className="text-pink-600 underline decoration-2 decoration-wavy hover:text-pink-700"
        >
          Log in now
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
