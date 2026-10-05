import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe } from 'lucide-react';

const AuthHeader = ({ showBack = false, backTo = '/login', backLabel = 'Back to Login' }) => {
  const navigate = useNavigate();

  return (
    <header className="w-full flex items-center justify-between py-3.5 px-4 sm:px-8 border-b border-[#E5E7EB] bg-white/95 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            type="button"
            onClick={() => navigate(backTo)}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#6B7280] hover:text-[#111827] px-2.5 py-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label={backLabel}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{backLabel}</span>
          </button>
        )}

        <Link
          to="/"
          className="flex items-center group outline-none focus-visible:ring-2 focus-visible:ring-[#E53935] rounded-xl"
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
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] text-xs font-semibold text-[#4B5563]"
          title="English supported"
        >
          <Globe className="w-3.5 h-3.5 text-[#9CA3AF]" />
          <span>EN</span>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
