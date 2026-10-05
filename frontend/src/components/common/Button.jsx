import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = true,
  loading = false,
  loadingText,
  disabled = false,
  onClick,
  className = '',
  icon: Icon,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.99] select-none cursor-pointer';

  const variants = {
    primary: 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold shadow-lg shadow-amber-500/25 focus-visible:ring-amber-400 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed',
    gold: 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold shadow-lg shadow-amber-500/25 focus-visible:ring-amber-400 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed',
    blue: 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold shadow-lg shadow-blue-600/30 focus-visible:ring-blue-500 active:scale-[0.99] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed',
    secondary: 'bg-[#141B2A] hover:bg-[#1E293B] text-amber-400 border border-[#212E46] focus-visible:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed',
    outline: 'bg-transparent hover:bg-[#141B2A] text-white border border-[#1E283D] hover:border-amber-400/50 focus-visible:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed',
    ghost: 'bg-transparent hover:bg-[#141B2A] text-[#94A3B8] hover:text-white focus-visible:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed',
  };

  const sizes = {
    sm: 'h-10 px-3.5 text-sm rounded-lg gap-1.5',
    md: 'h-[52px] px-5 text-[15px] font-semibold rounded-[14px] gap-2',
    lg: 'h-[56px] px-6 text-base font-semibold rounded-[14px] gap-2.5',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${widthClass} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
          <span>{loadingText || children}</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

export default Button;
