import { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

const Input = ({
  label,
  type = "text",
  placeholder,
  icon: Icon,
  value,
  onChange,
  error,
  isPassword = false,
}) => {
  const [showPass, setShowPass] = useState(false);
  const inputType = isPassword ? (showPass ? "text" : "password") : type;

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 ml-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
          {Icon && <Icon className="w-5 h-5" />}
        </div>
        <input
          type={inputType}
          className={`w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-900 border rounded-xl outline-none transition-all duration-200
            ${
              error
                ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                : "border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-800 dark:text-slate-100"
            }
          `}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors"
          >
            {showPass ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-1 text-red-500 text-xs ml-1 animate-in slide-in-from-left-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;

