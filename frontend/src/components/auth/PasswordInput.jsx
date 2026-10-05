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
        <label htmlFor={inputId} className="block text-sm font-semibold text-[#E2E8F0] mb-1.5">
          {label} {required && <span className="text-amber-400">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        <div className="absolute left-4 text-[#64748B] pointer-events-none flex items-center justify-center">
          <Lock className="w-5 h-5" aria-hidden="true" />
        </div>

        <input
          ref={undefined}
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
          className={`w-full h-[52px] bg-[#0A0D15] text-white placeholder-[#64748B] text-[15px] rounded-[14px] border pl-11 pr-12 transition-all duration-200 outline-none
            ${error
              ? 'border-red-500/60 bg-red-950/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
              : 'border-[#1E283D] hover:border-[#2A3752] focus:border-amber-400 focus:bg-[#0A0D15] focus:ring-2 focus:ring-amber-400/20'
            }
            disabled:bg-[#07090E] disabled:text-[#64748B] disabled:border-[#141B2A] disabled:cursor-not-allowed
          `}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          className="absolute right-3.5 p-1.5 text-[#64748B] hover:text-amber-400 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/30 cursor-pointer disabled:cursor-not-allowed"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Eye className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {error ? (
        <div id={errorId} className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-400" role="alert">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-[#64748B]">{helperText}</p>
      ) : null}
    </div>
  );
};

export default PasswordInput;
