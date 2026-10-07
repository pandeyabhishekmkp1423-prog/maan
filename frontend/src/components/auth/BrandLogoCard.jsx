import React from 'react';
import { Link } from 'react-router-dom';

/**
 * BrandLogoCard component matching the squircle maan.win brand card
 * from maanwin43.com.
 */
const BrandLogoCard = ({ className = '' }) => {
  return (
    <Link
      to="/"
      aria-label="MaanWin Home"
      className={`inline-block group focus:outline-none transition-transform duration-200 hover:scale-105 active:scale-95 ${className}`}
    >
      <div className="relative w-[112px] h-[112px] rounded-[26px] p-2 flex flex-col items-center justify-center bg-gradient-to-b from-[#182846] via-[#101b31] to-[#0a1120] border border-[#263c66] shadow-2xl shadow-black/80 overflow-hidden">
        {/* Subtle inner top glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400/10 via-transparent to-transparent pointer-events-none rounded-[26px]" />

        {/* Double Chevron / Fast-Forward Bolts matching screenshot */}
        <div className="relative flex items-center justify-center mb-1 drop-shadow-[0_4px_10px_rgba(255,140,0,0.55)]">
          <svg
            viewBox="0 0 92 70"
            className="w-16 h-12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="chevGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFCC00" />
                <stop offset="100%" stopColor="#FF6600" />
              </linearGradient>
              <linearGradient id="chevGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF7700" />
                <stop offset="100%" stopColor="#E62200" />
              </linearGradient>
            </defs>

            {/* Left Chevron */}
            <path
              d="M 18 56 L 43 35 L 18 14 L 30 14 L 55 35 L 30 56 Z"
              fill="url(#chevGrad1)"
            />
            {/* Right Chevron */}
            <path
              d="M 38 56 L 63 35 L 38 14 L 50 14 L 75 35 L 50 56 Z"
              fill="url(#chevGrad2)"
            />
          </svg>
        </div>

        {/* Brand Text: maan.win */}
        <span className="text-white font-extrabold text-[15px] tracking-tight drop-shadow-md select-none">
          maan<span className="text-[#ff9000]">.</span>win
        </span>

        {/* Soft bottom blue glossy reflex */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-blue-500/20 rounded-full blur-sm pointer-events-none" />
      </div>
    </Link>
  );
};

export default BrandLogoCard;
