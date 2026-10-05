import React, { useState } from 'react';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

const PasswordInput = ({
  id,
  name = 'password',
  label = 'Password',
  value,
  onChange,
  onBlur,
  placeholder = 'Enter your password',
  error,
  helperText,
  disabled = false,
  required = true,
  autoComplete = 'current-password',
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || name;
  const errorId = `${inputId}-error`;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-[#111827] mb-1.5">
          {label} {required && <span className="text-[#E53935]">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        <div className="absolute left-4 text-[#9CA3AF] pointer-events-none flex items-center justify-center">
          <Lock className="w-5 h-5" aria-hidden="true" />
        </div>

        <input
          id={inputId}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`w-full h-[52px] bg-[#F9FAFB] text-[#111827] placeholder-[#9CA3AF] text-[15px] rounded-[14px] border pl-11 pr-12 transition-all duration-200 outline-none
            ${error
              ? 'border-[#DC2626] bg-[#FFF5F5] focus:border-[#DC2626] focus:ring-3 focus:ring-[#DC2626]/15'
              : 'border-[#E5E7EB] hover:border-[#D1D5DB] focus:border-[#E53935] focus:bg-white focus:ring-3 focus:ring-[#E53935]/15'
            }
            disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF] disabled:cursor-not-allowed
          `}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          className="absolute right-3.5 p-1.5 text-[#9CA3AF] hover:text-[#4B5563] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E53935]/30 cursor-pointer disabled:cursor-not-allowed"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Eye className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {error ? (
        <div id={errorId} className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-[#DC2626]" role="alert">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-[#6B7280]">{helperText}</p>
      ) : null}
    </div>
  );
};

export default PasswordInput;
