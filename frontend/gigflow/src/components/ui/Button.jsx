import { Loader2 } from "lucide-react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  isLoading,
  disabled,
  className = "",
}) => {
  const baseStyle =
    "w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]";

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30",
    secondary:
      "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : children}
    </button>
  );
};

export default Button;

