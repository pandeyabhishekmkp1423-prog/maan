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
                ? 'bg-gradient-to-r from-amber-500 to-amber-400 border-amber-400 text-black shadow-xs shadow-amber-500/30'
                : error
                  ? 'border-red-500/60 bg-red-950/30'
                  : 'border-[#1E283D] bg-[#0A0D15] group-hover:border-[#334155]'
              }
              peer-focus-visible:ring-2 peer-focus-visible:ring-amber-400/40 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-offset-[#07090E]
              peer-disabled:bg-[#07090E] peer-disabled:border-[#141B2A] peer-disabled:cursor-not-allowed
            `}
          >
            {checked && <Check className="w-3.5 h-3.5 stroke-[3] text-black" aria-hidden="true" />}
          </div>
        </div>

        <div className="text-[13px] sm:text-sm text-[#94A3B8] leading-relaxed">
          {label}
        </div>
      </label>

      {error && (
        <div className="flex items-center gap-1.5 mt-1 text-xs font-medium text-red-400" role="alert">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default Checkbox;
