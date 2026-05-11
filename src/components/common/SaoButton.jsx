import React from 'react';

const SaoButton = ({ 
  children, 
  onClick, 
  variant = 'primary', // 'primary', 'secondary', 'critical'
  className = '',
  disabled = false
}) => {
  const baseStyle = "px-6 py-2 font-header text-lg tracking-wider rounded transition-all duration-300 transform";
  
  let variantStyle = "";
  switch(variant) {
    case 'primary':
      variantStyle = "bg-zekken-tunic text-zekken-skin hover:bg-zekken-hair shadow-lg shadow-zekken-tunic/50 hover:-translate-y-1 hover:shadow-zekken-hair/70";
      break;
    case 'secondary':
      variantStyle = "bg-sao-glass text-zekken-skin border border-sao-border hover:bg-white/20 hover:-translate-y-1";
      break;
    case 'critical':
      variantStyle = "bg-rosario-critical text-zekken-skin shadow-lg shadow-rosario-critical/50 hover:bg-red-700 hover:-translate-y-1 hover:shadow-red-700/70";
      break;
    default:
      variantStyle = "bg-zekken-tunic text-zekken-skin";
  }

  return (
    <button 
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseStyle} ${variantStyle} ${disabled ? 'opacity-50 cursor-not-allowed hover:translate-y-0 hover:shadow-none' : ''} ${className}`}
    >
      {children}
    </button>
  );
}

export default SaoButton;