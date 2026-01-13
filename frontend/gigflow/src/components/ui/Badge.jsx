import React from 'react';

const Badge = ({ text, color = "bg-blue-300", className = "" }) => (
  <span className={`inline-block px-3 py-1 ${color} border-2 border-black rounded-full text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${className}`}>
    {text}
  </span>
);

export default Badge;
