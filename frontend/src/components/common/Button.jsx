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
    primary: 'bg-[#E53935] hover:bg-[#C62828] text-white shadow-sm focus-visible:ring-[#E53935] disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF] disabled:shadow-none disabled:cursor-not-allowed',
    secondary: 'bg-[#FFF5F5] hover:bg-[#FEE2E2] text-[#E53935] border border-[#FEE2E2] focus-visible:ring-[#E53935] disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF] disabled:border-[#E5E7EB] disabled:cursor-not-allowed',
    outline: 'bg-white hover:bg-[#F9FAFB] text-[#111827] border border-[#E5E7EB] hover:border-[#D1D5DB] focus-visible:ring-[#E53935] disabled:bg-[#F9FAFB] disabled:text-[#9CA3AF] disabled:cursor-not-allowed',
    ghost: 'bg-transparent hover:bg-slate-100 text-[#6B7280] hover:text-[#111827] focus-visible:ring-slate-300 disabled:opacity-50 disabled:cursor-not-allowed',
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
