import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

const Input = forwardRef(({
  id,
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  helperText,
  icon: Icon,
  rightElement,
  disabled = false,
  required = false,
  autoComplete,
  className = '',
  inputClassName = '',
  ...props
}, ref) => {
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${inputId}-error`;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-[#E2E8F0] mb-1.5"
        >
          {label} {required && <span className="text-amber-400">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-4 text-[#64748B] pointer-events-none flex items-center justify-center">
            <Icon className="w-5 h-5" aria-hidden="true" />
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`w-full h-[52px] bg-[#0A0D15] text-white placeholder-[#64748B] text-[15px] rounded-[14px] border transition-all duration-200 outline-none
            ${Icon ? 'pl-11' : 'pl-4'}
            ${rightElement ? 'pr-12' : 'pr-4'}
            ${error
              ? 'border-red-500/60 bg-red-950/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
              : 'border-[#1E283D] hover:border-[#2A3752] focus:border-amber-400 focus:bg-[#0A0D15] focus:ring-2 focus:ring-amber-400/20'
            }
            disabled:bg-[#07090E] disabled:text-[#64748B] disabled:border-[#141B2A] disabled:cursor-not-allowed
            ${inputClassName}
          `}
          {...props}
        />

        {rightElement && (
          <div className="absolute right-3.5 flex items-center">
            {rightElement}
          </div>
        )}
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
});

Input.displayName = 'Input';

export default Input;
