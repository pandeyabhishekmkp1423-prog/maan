import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Headphones, MessageSquare, X } from 'lucide-react';
import BrandLogoCard from './BrandLogoCard';
import TelegramIcon from '../common/TelegramIcon';
import { EXTERNAL_LINKS } from '../../utils/constants';

const AuthLayout = ({
  children,
  showBack = true,
  backTo = '/',
  backLabel = 'Back',
  title,
  subtitle,
}) => {
  const navigate = useNavigate();
  const [legalModalContent, setLegalModalContent] = useState(null);
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  const openLegalModal = (type) => {
    if (type === 'privacy') {
      setLegalModalContent({
        title: 'Privacy Policy — MaanWin',
        text: `At MaanWin (maan.win), user security and data privacy are paramount. We strictly process user account identifiers (such as verified phone numbers or email addresses) solely for secure account creation, access verification, and session management. Passwords are cryptographically hashed using standard PHP secure hashing algorithms before database storage. We do not sell or disclose personal credentials to third-party advertisers.`,
      });
    } else {
      setLegalModalContent({
        title: 'Terms & Conditions — MaanWin',
        text: `By registering an account with MaanWin (maan.win), you acknowledge and agree to comply with all applicable terms, maintain the confidentiality of your authentication credentials, and authorize security checks against unauthorized or automated activities. Each user is permitted one primary account registered with their valid phone number or email address.`,
      });
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(backTo);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#8b929e] flex justify-center items-start selection:bg-amber-500/30 selection:text-amber-200">
      {/* ============================================================ */}
      {/* CENTERED MOBILE APP FRAME (MATCHING MAANWIN43.COM) */}
      {/* ============================================================ */}
      <div className="w-full max-w-[420px] min-h-screen relative bg-[#070c17] flex flex-col justify-start px-4 pt-3 pb-8 shadow-2xl overflow-y-auto">
        {/* Background Saloon Wallpaper inside the container */}
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat pointer-events-none opacity-90 z-0"
          style={{ backgroundImage: `url('/auth-bg.jpg')` }}
        />
        
        {/* Atmospheric Dark Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050914]/75 via-[#070e1c]/85 to-[#040710]/95 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/20 via-black/50 to-black/80 pointer-events-none z-0" />

        {/* ============================================================ */}
        {/* TOP BAR: Back < on Left, Support 🎧 & EN on Right */}
        {/* ============================================================ */}
        <header className="relative z-20 w-full flex items-center justify-between py-1.5 px-0.5">
          {/* Back Button */}
          {showBack ? (
            <button
              type="button"
              onClick={handleBack}
              className="p-1 -ml-1 text-slate-200 hover:text-white transition-colors cursor-pointer"
              aria-label={backLabel}
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
            </button>
          ) : (
            <div className="w-6 h-6" />
          )}

          {/* Right Action Icons: Telegram + Orange Headset + UK Flag EN */}
          <div className="flex items-center gap-3">
            {/* Official Telegram */}
            <a
              href="https://t.me/+u9ciQHkjVaczYTZl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#229ED9] hover:text-[#53b5e8] transition-colors cursor-pointer p-0.5"
              title="Official Telegram Channel"
              aria-label="Official Telegram"
            >
              <TelegramIcon className="w-5 h-5" />
            </a>

            {/* Customer Support Headset */}
            <button
              type="button"
              onClick={() => setSupportModalOpen(true)}
              className="text-[#ff8800] hover:text-[#ffa020] transition-colors cursor-pointer p-0.5"
              aria-label="Customer Support"
            >
              <Headphones className="w-5 h-5 fill-[#ff8800]/20 stroke-[2.2]" />
            </button>

            {/* Language Picker */}
            <button
              type="button"
              onClick={() => setLanguageModalOpen(true)}
              className="flex items-center gap-1 text-xs font-bold text-white hover:text-amber-300 transition-colors cursor-pointer"
              aria-label="Change Language"
            >
              {/* Circular UK Flag Icon */}
              <span className="text-base leading-none select-none">🇬🇧</span>
              <span className="tracking-wide">{currentLang}</span>
            </button>
          </div>
        </header>

        {/* ============================================================ */}
        {/* SQUIRCLE BRAND LOGO CARD */}
        {/* ============================================================ */}
        <div className="relative z-10 flex justify-center mt-5 mb-5">
          <BrandLogoCard />
        </div>

        {/* Optional Title & Subtitle */}
        {title && (
          <div className="relative z-10 text-center mb-4">
            <h1 className="text-xl font-bold text-white tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-xs text-slate-400">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* FORM CONTENT */}
        {/* ============================================================ */}
        <div className="relative z-10 w-full">
          {typeof children === 'function'
            ? children({ openLegalModal })
            : children}
        </div>
      </div>

      {/* ============================================================ */}
      {/* SUPPORT MODAL (Headphones) */}
      {/* ============================================================ */}
      {supportModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
        >
          <div className="bg-[#0e1628] rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#223356] text-white relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e2e4f]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <Headphones className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">24/7 Customer Support</h3>
              </div>
              <button
                type="button"
                onClick={() => setSupportModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Need assistance with your MaanWin account or referral code? Our verified support team is available 24/7.
            </p>

            <div className="mt-4 space-y-2.5">
              <a
                href={EXTERNAL_LINKS.TELEGRAM}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#142038] hover:bg-[#1a2b4b] border border-[#253961] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#229ED9]/20 text-[#229ED9] flex items-center justify-center">
                    <TelegramIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Official Telegram</div>
                    <div className="text-[10px] text-slate-400">Join Official Channel</div>
                  </div>
                </div>
                <span className="text-xs text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                  Connect &rarr;
                </span>
              </a>

              <button
                type="button"
                onClick={() => {
                  alert('Connecting to live chat agent...');
                  setSupportModalOpen(false);
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#142038] hover:bg-[#1a2b4b] border border-[#253961] transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white">Online Live Chat</div>
                    <div className="text-[10px] text-emerald-400">Response time &lt; 1 min</div>
                  </div>
                </div>
                <span className="text-xs text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                  Start Chat &rarr;
                </span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setSupportModalOpen(false)}
              className="mt-4 w-full py-2.5 text-xs font-bold text-slate-300 hover:text-white rounded-xl bg-slate-800/80 hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* LANGUAGE SELECTOR MODAL */}
      {/* ============================================================ */}
      {languageModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
        >
          <div className="bg-[#0e1628] rounded-3xl max-w-xs w-full p-5 shadow-2xl border border-[#223356] text-white">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e2e4f]">
              <h3 className="text-sm font-bold text-white">Select Language</h3>
              <button
                type="button"
                onClick={() => setLanguageModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 space-y-1.5">
              {[
                { code: 'EN', name: 'English', flag: '🇬🇧' },
                { code: 'HI', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
                { code: 'ES', name: 'Español', flag: '🇪🇸' },
                { code: 'PT', name: 'Português', flag: '🇧🇷' },
              ].map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setCurrentLang(lang.code);
                    setLanguageModalOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer
                    ${currentLang === lang.code
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                      : 'hover:bg-slate-800 text-slate-300'
                    }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                  {currentLang === lang.code && (
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TERMS / PRIVACY MODAL */}
      {/* ============================================================ */}
      {legalModalContent && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
        >
          <div className="bg-[#0e1628] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#223356] text-white">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e2e4f]">
              <h3 className="text-base font-bold text-white">{legalModalContent.title}</h3>
              <button
                type="button"
                onClick={() => setLegalModalContent(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 max-h-[60vh] overflow-y-auto pr-1 text-xs text-slate-300 leading-relaxed space-y-3">
              <p>{legalModalContent.text}</p>
            </div>

            <div className="mt-5 pt-3 border-t border-[#1e2e4f] flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModalContent(null)}
                className="px-5 py-2 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthLayout;
