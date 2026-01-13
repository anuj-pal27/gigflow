import { CheckCircle2 } from "lucide-react";
import { checkPasswordStrength, getPasswordChecks } from "../../utils/validation";

const PasswordStrengthMeter = ({ password }) => {
  const strength = checkPasswordStrength(password);

  if (!password) return null;

  const checks = getPasswordChecks(password);

  const getColor = (s) => {
    if (s <= 1) return "bg-red-400";
    if (s === 2) return "bg-orange-400";
    if (s === 3) return "bg-yellow-400";
    return "bg-green-400";
  };

  return (
    <div className="space-y-3 mt-3 p-4 bg-pink-50 border-2 border-black rounded-2xl">
      <div className="flex gap-1.5 h-2.5 w-full">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-full flex-1 border-2 border-black rounded-full transition-all duration-300 ${
              strength >= step ? getColor(strength) : "bg-white"
            }`}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {checks.map((check) => (
          <div
            key={check.label}
            className={`text-xs font-bold flex items-center gap-1.5 transition-colors uppercase ${
              check.met ? "text-green-700" : "text-gray-400"
            }`}
          >
            {check.met ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <div className="w-4 h-4 rounded-full border-2 border-current" />
            )}
            {check.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
