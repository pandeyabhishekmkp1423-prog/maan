import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';
import { normalizePhone } from '../../utils/validation';

export const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳', placeholder: '9876543210', maxLen: 10 },
  { code: '+1', country: 'USA / Canada', flag: '🇺🇸', placeholder: '2025550143', maxLen: 10 },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧', placeholder: '7911123456', maxLen: 11 },
  { code: '+971', country: 'UAE', flag: '🇦🇪', placeholder: '501234567', maxLen: 9 },
  { code: '+65', country: 'Singapore', flag: '🇸🇬', placeholder: '81234567', maxLen: 8 },
  { code: '+61', country: 'Australia', flag: '🇦🇺', placeholder: '412345678', maxLen: 9 },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦', placeholder: '501234567', maxLen: 9 },
];

const PhoneInput = ({
  id = 'phone',
  label = 'Phone Number',
  countryCode = '+91',
  onCountryCodeChange,
  phone = '',
  onPhoneChange,
  onBlur,
  error,
  disabled = false,
  required = true,
  className = '',
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedCountry = COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[0];

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handlePhoneInputChange = (e) => {
    const rawVal = e.target.value;
    const digitsOnly = normalizePhone(rawVal);
    // Limit to maxLen for the selected country
    const truncated = digitsOnly.slice(0, selectedCountry.maxLen || 15);
    onPhoneChange(truncated);
  };

  const handleSelectCode = (c) => {
    onCountryCodeChange(c.code);
    setDropdownOpen(false);
  };

  const errorId = `${id}-error`;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-[#E2E8F0] mb-1.5">
          {label} {required && <span className="text-amber-400">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {/* Country Code Selector */}
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            disabled={disabled}
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
            aria-label="Select Country Code"
            className="h-[52px] px-3 sm:px-3.5 bg-[#0A0D15] hover:bg-[#141B2A] text-white border border-[#1E283D] border-r-0 rounded-l-[14px] flex items-center gap-1.5 font-medium text-sm transition-colors focus-visible:ring-2 focus-visible:ring-amber-400/20 focus-visible:z-10 cursor-pointer disabled:bg-[#07090E] disabled:text-[#64748B] disabled:cursor-not-allowed"
          >
            <span className="text-base select-none">{selectedCountry.flag}</span>
            <span className="font-semibold text-slate-100">{selectedCountry.code}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-amber-400 transition-transform duration-150 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <div
              role="listbox"
              aria-label="Country Codes"
              className="absolute left-0 top-[56px] z-50 w-60 max-h-60 overflow-y-auto bg-[#0F1420] rounded-xl shadow-2xl border border-[#1E283D] py-1 animate-in fade-in zoom-in-95 duration-100"
            >
              {COUNTRY_CODES.map((item) => (
                <button
                  key={item.code + item.country}
                  type="button"
                  role="option"
                  aria-selected={item.code === countryCode}
                  onClick={() => handleSelectCode(item)}
                  className={`w-full text-left px-3.5 py-2.5 text-sm flex items-center justify-between hover:bg-[#1A2337] transition-colors cursor-pointer
                    ${item.code === countryCode ? 'bg-amber-500/15 text-amber-300 font-semibold border-l-2 border-amber-400' : 'text-slate-200'}
                  `}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-base">{item.flag}</span>
                    <span className="text-xs sm:text-sm font-medium">{item.country}</span>
                  </span>
                  <span className="text-xs text-amber-400/90 font-mono font-semibold">{item.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Phone Input Field */}
        <input
          id={id}
          name="phone"
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="tel"
          value={phone}
          onChange={handlePhoneInputChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={selectedCountry.placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`flex-1 h-[52px] bg-[#0A0D15] text-white placeholder-[#64748B] text-[15px] rounded-r-[14px] border border-l-0 px-4 transition-all duration-200 outline-none
            ${error
              ? 'border-red-500/60 bg-red-950/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
              : 'border-[#1E283D] hover:border-[#2A3752] focus:border-amber-400 focus:bg-[#0A0D15] focus:ring-2 focus:ring-amber-400/20'
            }
            disabled:bg-[#07090E] disabled:text-[#64748B] disabled:border-[#141B2A] disabled:cursor-not-allowed
          `}
        />
      </div>

      {error && (
        <div id={errorId} className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-red-400" role="alert">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default PhoneInput;
