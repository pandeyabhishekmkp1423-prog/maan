import React from 'react';
import { Check, AlertCircle } from 'lucide-react';

const Checkbox = ({
  id,
  name,
  checked,
  onChange,
  label,
  error,
  disabled = false,
  className = '',
}) => {
  const checkboxId = id || name || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor={checkboxId}
        className="flex items-start gap-3 cursor-pointer select-none group"
      >
        <div className="relative flex items-center justify-center shrink-0 mt-0.5">
          <input
            id={checkboxId}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            aria-invalid={!!error}
            className="sr-only peer"
          />
          <div
            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200
              ${checked
                ? 'bg-[#E53935] border-[#E53935] text-white shadow-xs'
                : error
                  ? 'border-[#DC2626] bg-[#FFF5F5]'
                  : 'border-[#D1D5DB] bg-white group-hover:border-[#9CA3AF]'
              }
              peer-focus-visible:ring-2 peer-focus-visible:ring-[#E53935]/40 peer-focus-visible:ring-offset-1
              peer-disabled:bg-slate-100 peer-disabled:border-slate-300 peer-disabled:cursor-not-allowed
            `}
          >
            {checked && <Check className="w-3.5 h-3.5 stroke-[3]" aria-hidden="true" />}
          </div>
        </div>

        <div className="text-[13px] sm:text-sm text-[#4B5563] leading-relaxed">
          {label}
        </div>
      </label>

      {error && (
        <div className="flex items-center gap-1.5 mt-1 text-xs font-medium text-[#DC2626]" role="alert">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default Checkbox;
