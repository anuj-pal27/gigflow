import React from 'react';
import { Loader2 } from 'lucide-react';

const STYLE = {
  border: 'border-black',
  shadow: 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
  radius: 'rounded-2xl',
  primary: 'bg-pink-500 text-white hover:bg-pink-600',
  secondary: 'bg-white text-black hover:bg-pink-50',
  accent: 'bg-green-400 text-black hover:bg-green-300',
};

const Button = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  disabled,
  className = '', 
  ...props 
}) => {
  const base = `px-6 py-3 font-black border-2 ${STYLE.border} ${STYLE.radius} transition-all duration-200 flex items-center justify-center gap-2 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0`;
  const variants = {
    primary: `${STYLE.primary} ${STYLE.shadow}`,
    secondary: `${STYLE.secondary} ${STYLE.shadow}`,
    accent: `${STYLE.accent} ${STYLE.shadow}`,
    ghost: `bg-transparent border-transparent hover:bg-black/5`,
    outline: `bg-transparent border-2 border-black hover:bg-white ${STYLE.shadow}`,
    danger: `bg-red-500 text-white hover:bg-red-600 ${STYLE.shadow}`,
  };

  return (
    <button 
      className={`${base} ${variants[variant]} ${className}`} 
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
