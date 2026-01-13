import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Input = ({ 
  label, 
  icon: Icon, 
  isPassword, 
  error, 
  textarea, 
  onChange,
  className = '', 
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    // Support both direct value and event-based onChange
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : props.type || 'text';

  const baseInputClasses = `w-full p-3 ${Icon ? 'pl-11' : ''} ${isPassword ? 'pr-11' : ''} border-2 border-black rounded-xl outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-medium bg-white`;
  const errorClasses = error ? 'border-red-500 bg-red-50' : '';

  return (
    <div className={`space-y-2 w-full ${className}`}>
      {label && (
        <label className="block text-sm font-black uppercase">{label}</label>
      )}
      
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
        
        {textarea ? (
          <textarea 
            {...props}
            onChange={handleChange}
            className={`${baseInputClasses} ${errorClasses} min-h-[100px]`}
          />
        ) : (
          <input 
            {...props}
            type={inputType}
            onChange={handleChange}
            className={`${baseInputClasses} ${errorClasses}`}
          />
        )}

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-xs font-bold">{error}</p>
      )}
    </div>
  );
};

export default Input;
