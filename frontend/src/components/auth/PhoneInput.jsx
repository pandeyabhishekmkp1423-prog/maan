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
        <label htmlFor={id} className="block text-sm font-semibold text-[#111827] mb-1.5">
          {label} {required && <span className="text-[#E53935]">*</span>}
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
            className="h-[52px] px-3 sm:px-3.5 bg-[#F9FAFB] hover:bg-[#F3F4F6] text-[#111827] border border-[#E5E7EB] border-r-0 rounded-l-[14px] flex items-center gap-1.5 font-medium text-sm transition-colors focus-visible:ring-2 focus-visible:ring-[#E53935]/20 focus-visible:z-10 cursor-pointer disabled:cursor-not-allowed"
          >
            <span className="text-base select-none">{selectedCountry.flag}</span>
            <span className="font-semibold">{selectedCountry.code}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-[#6B7280] transition-transform duration-150 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <div
              role="listbox"
              aria-label="Country Codes"
              className="absolute left-0 top-[56px] z-50 w-56 max-h-60 overflow-y-auto bg-white rounded-xl shadow-lg border border-[#E5E7EB] py-1 animate-in fade-in zoom-in-95 duration-100"
            >
              {COUNTRY_CODES.map((item) => (
                <button
                  key={item.code + item.country}
                  type="button"
                  role="option"
                  aria-selected={item.code === countryCode}
                  onClick={() => handleSelectCode(item)}
                  className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-[#FFF5F5] transition-colors cursor-pointer
                    ${item.code === countryCode ? 'bg-[#FFF5F5] text-[#E53935] font-semibold' : 'text-[#111827]'}
                  `}
                >
                  <span className="flex items-center gap-2">
                    <span>{item.flag}</span>
                    <span>{item.country}</span>
                  </span>
                  <span className="text-xs text-[#6B7280] font-mono">{item.code}</span>
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
          className={`flex-1 h-[52px] bg-[#F9FAFB] text-[#111827] placeholder-[#9CA3AF] text-[15px] rounded-r-[14px] border border-l-0 px-4 transition-all duration-200 outline-none
            ${error
              ? 'border-[#DC2626] bg-[#FFF5F5] focus:border-[#DC2626] focus:ring-3 focus:ring-[#DC2626]/15'
              : 'border-[#E5E7EB] hover:border-[#D1D5DB] focus:border-[#E53935] focus:bg-white focus:ring-3 focus:ring-[#E53935]/15'
            }
            disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF] disabled:cursor-not-allowed
          `}
        />
      </div>

      {error && (
        <div id={errorId} className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-[#DC2626]" role="alert">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default PhoneInput;
