import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Zap, X, ArrowLeft } from 'lucide-react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const AuthLayout = ({
  children,
  showBack = false,
  backTo = '/login',
  backLabel = 'Back to Login',
  title,
  subtitle,
}) => {
  const navigate = useNavigate();
  const [modalContent, setModalContent] = useState(null);

  const openLegalModal = (type) => {
    if (type === 'privacy') {
      setModalContent({
        title: 'Privacy Policy — MaanWin51',
        text: `At MaanWin51 (maanwin51.com), user security and data privacy are paramount. We strictly process user account identifiers (such as verified phone numbers or email addresses) solely for secure account creation, access verification, and session management. Passwords are cryptographically hashed using standard PHP secure hashing algorithms before database storage. We do not sell or disclose personal credentials to third-party advertisers.`,
      });
    } else {
      setModalContent({
        title: 'Terms & Conditions — MaanWin51',
        text: `By registering an account with MaanWin51 (maanwin51.com), you acknowledge and agree to comply with all applicable terms, maintain the confidentiality of your authentication credentials, and authorize security checks against unauthorized or automated brute-force activities. Each user is permitted one primary account registered with their valid phone number or email address.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] flex flex-col text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Ambient Glowing Background Orbs */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 left-10 w-80 h-80 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Brand Pill */}
        <div className="relative z-10 mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F1420] border border-amber-500/30 shadow-lg shadow-black/50 text-xs font-bold text-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Official Authentication &bull; maanwin51.com
          </div>
        </div>

        {/* Center Auth Card */}
        <div className="relative z-10 w-full max-w-[460px] sm:max-w-[480px]">
          {/* Card Top Glowing Border Gradient */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-t-3xl" />

          <div className="bg-[#0F1420] rounded-b-3xl border border-[#1E283D] border-t-0 shadow-2xl shadow-black/90 p-6 sm:p-9 relative">
            {/* Back button if enabled */}
            {showBack && (
              <button
                type="button"
                onClick={() => navigate(backTo)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#94A3B8] hover:text-white mb-4 px-2.5 py-1 rounded-lg border border-[#1E283D] bg-[#0A0D15] hover:bg-[#141B2A] transition-colors cursor-pointer"
                aria-label={backLabel}
              >
                <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
                <span>{backLabel}</span>
              </button>
            )}

            {/* Logo & Header */}
            <div className="text-center mb-6">
              <Link to="/" className="inline-block mb-3 group focus:outline-none" aria-label="MaanWin51 Home">
                <img
                  src="/logo.jpeg"
                  alt="MaanWin51 Logo"
                  className="h-14 sm:h-16 w-auto object-contain mx-auto rounded-xl transition-transform duration-200 group-hover:scale-105"
                />
              </Link>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Form Slot */}
            {typeof children === 'function' ? children({ openLegalModal }) : children}

            {/* Legal Links */}
            <div className="mt-6 pt-5 border-t border-[#141B2A] text-center text-xs text-[#64748B]">
              <span>Protected by MaanWin51 &middot; </span>
              <button
                type="button"
                onClick={() => openLegalModal('privacy')}
                className="text-amber-400 hover:text-amber-300 underline cursor-pointer"
              >
                Privacy Policy
              </button>
              <span> &middot; </span>
              <button
                type="button"
                onClick={() => openLegalModal('terms')}
                className="text-amber-400 hover:text-amber-300 underline cursor-pointer"
              >
                Terms of Service
              </button>
            </div>
          </div>

          {/* Trust Highlights below Card */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 text-xs text-[#94A3B8] mt-6 pt-4 border-t border-[#1E283D]/60">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit SSL Protection</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Provably Fair</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>Instant Access</span>
            </span>
          </div>
        </div>
      </main>

      <Footer />

      {/* Terms / Privacy Modal Dialog */}
      {modalContent && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
        >
          <div className="bg-[#0F1420] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#1E283D] text-white">
            <div className="flex items-center justify-between pb-4 border-b border-[#1E283D]">
              <h3 className="text-lg font-bold text-white">{modalContent.title}</h3>
              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="p-1.5 rounded-lg hover:bg-[#141B2A] text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-4 text-sm text-[#94A3B8] leading-relaxed max-h-72 overflow-y-auto">
              {modalContent.text}
            </div>
            <div className="pt-4 border-t border-[#1E283D] flex justify-end">
              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-black text-sm font-extrabold rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthLayout;
