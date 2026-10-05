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
          className="block text-sm font-semibold text-[#111827] mb-1.5"
        >
          {label} {required && <span className="text-[#E53935]">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-4 text-[#9CA3AF] pointer-events-none flex items-center justify-center">
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
          className={`w-full h-[52px] bg-[#F9FAFB] text-[#111827] placeholder-[#9CA3AF] text-[15px] rounded-[14px] border transition-all duration-200 outline-none
            ${Icon ? 'pl-11' : 'pl-4'}
            ${rightElement ? 'pr-12' : 'pr-4'}
            ${error
              ? 'border-[#DC2626] bg-[#FFF5F5] focus:border-[#DC2626] focus:ring-3 focus:ring-[#DC2626]/15'
              : 'border-[#E5E7EB] hover:border-[#D1D5DB] focus:border-[#E53935] focus:bg-white focus:ring-3 focus:ring-[#E53935]/15'
            }
            disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF] disabled:cursor-not-allowed
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
        <div id={errorId} className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-[#DC2626]" role="alert">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-[#6B7280]">{helperText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
