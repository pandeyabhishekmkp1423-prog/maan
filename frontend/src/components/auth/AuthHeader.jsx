import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe } from 'lucide-react';

const AuthHeader = ({ showBack = false, backTo = '/login', backLabel = 'Back to Login' }) => {
  const navigate = useNavigate();

  return (
    <header className="w-full flex items-center justify-between py-3.5 px-4 sm:px-8 border-b border-[#141B2A] bg-[#07090E]/90 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            type="button"
            onClick={() => navigate(backTo)}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#94A3B8] hover:text-white px-3 py-1.5 rounded-xl border border-[#1E283D] bg-[#0F1420] hover:bg-[#141B2A] transition-colors cursor-pointer"
            aria-label={backLabel}
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">{backLabel}</span>
          </button>
        )}

        <Link
          to="/"
          className="flex items-center group outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-xl"
          aria-label="MaanWin51 Home"
        >
          <img
            src="/logo.jpeg"
            alt="Logo"
            className="h-10 sm:h-12 w-auto object-contain rounded-lg transition-transform duration-200 group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#1E283D] bg-[#0F1420] text-xs font-semibold text-[#94A3B8]"
          title="English supported"
        >
          <Globe className="w-3.5 h-3.5 text-amber-400" />
          <span>EN</span>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
