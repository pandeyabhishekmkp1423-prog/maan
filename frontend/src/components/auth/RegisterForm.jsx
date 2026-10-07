import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { COUNTRY_CODES } from './PhoneInput';
import { redirectToRegister, redirectToLogin } from '../../utils/constants';

/**
 * Custom closed eye icon with eyelashes matching screenshot
 */
const ClosedEyeLashesIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-[18px] h-[18px] text-[#60718d] hover:text-slate-300 transition-colors"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 10.5c2.5 3 6.5 4.5 10 4.5s7.5-1.5 10-4.5" />
    <line x1="3.5" y1="13" x2="2.5" y2="15.5" />
    <line x1="7.5" y1="14.5" x2="6.5" y2="17.5" />
    <line x1="12" y1="15" x2="12" y2="18.5" />
    <line x1="16.5" y1="14.5" x2="17.5" y2="17.5" />
    <line x1="20.5" y1="13" x2="21.5" y2="15.5" />
  </svg>
);

const OpenEyeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-[18px] h-[18px] text-[#ff9900] hover:text-amber-300 transition-colors"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const RegisterForm = () => {
  const [searchParams] = useSearchParams();

  // Support ?inviteCode=PXUCQ4N&from=web as seen in the reference screenshot
  const queryInvite =
    searchParams.get('inviteCode') ||
    searchParams.get('invite') ||
    searchParams.get('ref') ||
    searchParams.get('code') ||
    'PXUCQ4N';

  // Form State
  const [countryCode, setCountryCode] = useState('+91');
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inviteCode, setInviteCode] = useState(queryInvite.toUpperCase());

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const selectedCountry = COUNTRY_CODES.find((c) => c.code === countryCode) || COUNTRY_CODES[0];

  const handleRegisterClick = (e) => {
    if (e) e.preventDefault();
    redirectToRegister(inviteCode);
  };

  const handleLoginClick = (e) => {
    if (e) e.preventDefault();
    redirectToLogin();
  };

  return (
    <form onSubmit={handleRegisterClick} noValidate className="w-full">
      {/* INPUTS LIST */}
      <div className="space-y-3">
        {/* ============================================================ */}
        {/* 1. PHONE NUMBER INPUT ROW */}
        {/* ============================================================ */}
        <div>
          <div className="relative flex items-center h-[48px] rounded-xl px-3.5 bg-[#0e1627]/85 border border-[#1d2940] hover:border-[#2b3a59] focus-within:border-[#38517e] transition-colors">
            {/* Phone Icon */}
            <svg
              viewBox="0 0 24 24"
              className="w-[18px] h-[18px] text-[#60718d] shrink-0 mr-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
              <line x1="12" x2="12.01" y1="18" y2="18" />
            </svg>

            {/* Country Code (+91) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCountryDropdownOpen((prev) => !prev)}
                className="text-white font-bold text-sm mr-3 select-none hover:text-amber-300 transition-colors cursor-pointer"
                aria-label="Select Country Code"
              >
                {selectedCountry.code}
              </button>

              {countryDropdownOpen && (
                <div className="absolute left-0 top-9 z-50 w-48 max-h-52 overflow-y-auto bg-[#0d162a] rounded-xl shadow-2xl border border-[#233558] py-1">
                  {COUNTRY_CODES.map((item) => (
                    <button
                      key={item.code + item.country}
                      type="button"
                      onClick={() => {
                        setCountryCode(item.code);
                        setCountryDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#15233f] cursor-pointer ${
                        item.code === countryCode
                          ? 'bg-amber-500/20 text-amber-300 font-bold'
                          : 'text-slate-200'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span>{item.flag}</span>
                        <span>{item.country}</span>
                      </span>
                      <span className="font-semibold text-slate-400">{item.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Phone Input Field */}
            <input
              type="tel"
              id="register-phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter your phone number"
              className="w-full bg-transparent text-white placeholder-[#60718d] text-sm outline-none font-medium"
              autoComplete="tel"
            />
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. PASSWORD INPUT ROW */}
        {/* ============================================================ */}
        <div>
          <div className="relative flex items-center h-[48px] rounded-xl px-3.5 bg-[#0e1627]/85 border border-[#1d2940] hover:border-[#2b3a59] focus-within:border-[#38517e] transition-colors">
            {/* Padlock Icon */}
            <svg
              viewBox="0 0 24 24"
              className="w-[18px] h-[18px] text-[#60718d] shrink-0 mr-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>

            <input
              type={showPassword ? 'text' : 'password'}
              id="register-password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password:8-15 letters and numbers"
              className="w-full bg-transparent text-white placeholder-[#60718d] text-sm outline-none font-medium pr-8"
              autoComplete="new-password"
            />

            {/* Eye Toggle with eyelashes */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3.5 p-1 cursor-pointer select-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <OpenEyeIcon /> : <ClosedEyeLashesIcon />}
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. CONFIRM PASSWORD INPUT ROW */}
        {/* ============================================================ */}
        <div>
          <div className="relative flex items-center h-[48px] rounded-xl px-3.5 bg-[#0e1627]/85 border border-[#1d2940] hover:border-[#2b3a59] focus-within:border-[#38517e] transition-colors">
            {/* Padlock Icon */}
            <svg
              viewBox="0 0 24 24"
              className="w-[18px] h-[18px] text-[#60718d] shrink-0 mr-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>

            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="register-confirm-password"
              name="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter the password again"
              className="w-full bg-transparent text-white placeholder-[#60718d] text-sm outline-none font-medium pr-8"
              autoComplete="new-password"
            />

            {/* Eye Toggle with eyelashes */}
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3.5 p-1 cursor-pointer select-none"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <OpenEyeIcon /> : <ClosedEyeLashesIcon />}
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. REFERRAL CODE ROW (PXUCQ4N) */}
        {/* ============================================================ */}
        <div>
          <div className="relative flex items-center h-[48px] rounded-xl px-3.5 bg-[#0e1627]/85 border border-[#1d2940] hover:border-[#2b3a59] focus-within:border-[#38517e] transition-colors">
            {/* Shield Icon */}
            <svg
              viewBox="0 0 24 24"
              className="w-[18px] h-[18px] text-[#60718d] shrink-0 mr-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M12 8v5" />
              <circle cx="12" cy="15" r="1" />
            </svg>

            <input
              type="text"
              id="register-invite-code"
              name="invite_code"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
              placeholder="PXUCQ4N"
              className="w-full bg-transparent text-white placeholder-[#60718d] text-sm outline-none font-semibold uppercase tracking-wider"
            />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 5. BONUS CHIP (+3~299) */}
      {/* ============================================================ */}
      <div className="mt-4 mb-2 flex justify-center">
        <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#52330a]/85 border border-[#94621c]/60 text-[#ffbe3b] text-[11px] font-black tracking-wide shadow-sm">
          <span className="text-xs select-none">🪙</span>
          <span>+3~299</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 6. REGISTER BUTTON (ORANGE GLOW PILL -> REDIRECTS TO REGISTER) */}
      {/* ============================================================ */}
      <button
        type="button"
        onClick={handleRegisterClick}
        className="w-full h-[48px] rounded-full font-bold text-[16px] text-white transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/25 hover:brightness-105 active:scale-[0.99] tracking-wide"
        style={{
          background: 'linear-gradient(90deg, #ff7a00 0%, #ffa000 100%)',
        }}
      >
        <span>Register</span>
      </button>

      {/* ============================================================ */}
      {/* 7. PASSWORD LOGIN BUTTON (OUTLINED ORANGE PILL -> REDIRECTS TO LOGIN) */}
      {/* ============================================================ */}
      <button
        type="button"
        onClick={handleLoginClick}
        className="mt-3 w-full h-[48px] rounded-full font-bold text-[16px] text-[#ff7a00] border border-[#ff7a00] bg-transparent hover:bg-[#ff7a00]/10 transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-[0.99] tracking-wide"
      >
        <span>Password Login</span>
      </button>
    </form>
  );
};

export default RegisterForm;
