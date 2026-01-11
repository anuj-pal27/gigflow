import { CheckCircle2 } from "lucide-react";
import { checkPasswordStrength, getPasswordChecks } from "../../utils/validation";

const PasswordStrengthMeter = ({ password }) => {
  const strength = checkPasswordStrength(password);

  if (!password) return null;

  const checks = getPasswordChecks(password);

  const getColor = (s) => {
    if (s <= 1) return "bg-red-500";
    if (s === 2) return "bg-orange-500";
    if (s === 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-2 mt-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700/50">
      <div className="flex gap-1 h-1.5 w-full">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-full flex-1 rounded-full transition-all duration-300 ${
              strength >= step ? getColor(strength) : "bg-slate-200 dark:bg-slate-700"
            }`}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {checks.map((check) => (
          <div
            key={check.label}
            className={`text-xs flex items-center gap-1.5 transition-colors ${
              check.met ? "text-green-600 dark:text-green-400" : "text-slate-400"
            }`}
          >
            {check.met ? (
              <CheckCircle2 className="w-3 h-3" />
            ) : (
              <div className="w-3 h-3 rounded-full border border-current" />
            )}
            {check.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;

