import { Sparkles, Lock } from "lucide-react";
import { Card } from "../components/ui";
import { LoginForm, SignupForm } from "../components/auth";

const AuthPage = ({
  mode,
  role,
  onAuth,
  onSwitchMode,
  onBack,
  error,
  isLoading,
}) => {
  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      {/* Polka dot pattern overlay */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(black 2px, transparent 2px)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      <div className="w-full max-w-md relative z-10">
        <Card className="p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {/* Back button */}
          <button
            onClick={onBack}
            className="text-sm mb-6 flex items-center gap-1 font-bold hover:underline text-gray-600"
          >
            ← Back
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-pink-500 text-white flex items-center justify-center border-2 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-6">
              <Sparkles className="w-10 h-10" />
            </div>
          </div>

          {/* Role indicator */}
          <div className="text-center mb-6">
            <span
              className={`inline-block px-4 py-1 text-xs font-black uppercase border-2 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                role === "client" ? "bg-yellow-200" : "bg-pink-200"
              }`}
            >
              {role === "client" ? "Client Account" : "Freelancer Account"}
            </span>
          </div>

          {mode === "login" ? (
            <LoginForm
              onLogin={(email, password) => onAuth(email, password, role)}
              onSwitch={onSwitchMode}
              error={error}
              isLoading={isLoading}
            />
          ) : (
            <SignupForm
              onSignup={(data) => onAuth({ ...data, role })}
              onSwitch={onSwitchMode}
              error={error}
              isLoading={isLoading}
            />
          )}
        </Card>

        <p className="text-center mt-8 text-sm font-bold text-gray-600 flex items-center justify-center gap-2">
          <Lock className="w-4 h-4" />
          YOUR DATA IS ENCRYPTED & SECURE
        </p>
      </div>
    </div>
  );
};

export default AuthPage;

