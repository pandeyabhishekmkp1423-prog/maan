import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, ArrowUp } from 'lucide-react';
import TelegramIcon from '../common/TelegramIcon';
import { EXTERNAL_LINKS } from '../../utils/constants';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05070B] text-[#94A3B8] border-t border-[#141B28] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block" aria-label="Home">
              <img
                src="/logo.jpeg"
                alt="Logo"
                className="h-11 sm:h-14 w-auto object-contain rounded-lg"
              />
            </Link>

            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-sm">
              India's premier verified color trading and online gaming platform. Offering high-frequency prediction markets, provably fair mechanics, and 24/7 instant withdrawals.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-full font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-950/40 border border-amber-800/40 px-3 py-1.5 rounded-full font-semibold">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>RNG Certified</span>
              </div>
            </div>

            {/* Telegram Channel Button in Footer */}
            <div className="pt-2">
              <a
                href={EXTERNAL_LINKS.TELEGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#229ED9]/15 hover:bg-[#229ED9]/25 border border-[#229ED9]/30 text-[#229ED9] text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <TelegramIcon className="w-4 h-4 fill-[#229ED9]" />
                <span>Join Official Telegram Channel</span>
              </a>
            </div>
          </div>

          {/* Col 1: Platform Games */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Popular Games
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#games" className="text-[#94A3B8] hover:text-amber-400 transition-colors">Win Go (1Min / 3Min)</a>
              </li>
              <li>
                <a href="#games" className="text-[#94A3B8] hover:text-amber-400 transition-colors">Trx Win Go Hash</a>
              </li>
              <li>
                <a href="#games" className="text-[#94A3B8] hover:text-amber-400 transition-colors">5D Lotre Prediction</a>
              </li>
              <li>
                <a href="#games" className="text-[#94A3B8] hover:text-amber-400 transition-colors">K3 Dice Lotre</a>
              </li>
              <li>
                <a href="#games" className="text-[#94A3B8] hover:text-amber-400 transition-colors">Aviator &amp; Crash</a>
              </li>
              <li>
                <a href="#games" className="text-[#94A3B8] hover:text-amber-400 transition-colors">Jili &amp; PG Slots</a>
              </li>
            </ul>
          </div>

          {/* Col 2: Member Access */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Member Access
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={EXTERNAL_LINKS.LOGIN} className="text-[#94A3B8] hover:text-amber-400 transition-colors">User Login</a>
              </li>
              <li>
                <a href={EXTERNAL_LINKS.REGISTER} className="text-[#94A3B8] hover:text-amber-400 transition-colors">Create Account</a>
              </li>
              <li>
                <a href={EXTERNAL_LINKS.TELEGRAM} target="_blank" rel="noopener noreferrer" className="text-[#229ED9] hover:underline font-semibold flex items-center gap-1.5">
                  <TelegramIcon className="w-3.5 h-3.5 fill-[#229ED9]" />
                  <span>Official Telegram</span>
                </a>
              </li>
              <li>
                <Link to="/forgot-password" className="text-[#94A3B8] hover:text-amber-400 transition-colors">Forgot Password</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-[#94A3B8] hover:text-amber-400 transition-colors">Member Dashboard</Link>
              </li>
              <li>
                <a href="#download" className="text-[#94A3B8] hover:text-amber-400 transition-colors">Download Android APK</a>
              </li>
              <li>
                <a href="#rewards" className="text-[#94A3B8] hover:text-amber-400 transition-colors">VIP Rewards Program</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Information & Help */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Support &amp; Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={EXTERNAL_LINKS.TELEGRAM} target="_blank" rel="noopener noreferrer" className="text-[#229ED9] hover:underline font-semibold flex items-center gap-1.5">
                  <TelegramIcon className="w-3.5 h-3.5 fill-[#229ED9]" />
                  <span>24/7 Telegram Support</span>
                </a>
              </li>
              <li>
                <a href="#how-to-play" className="text-[#94A3B8] hover:text-amber-400 transition-colors">How to Play Guide</a>
              </li>
              <li>
                <a href="#specs" className="text-[#94A3B8] hover:text-amber-400 transition-colors">App Specifications</a>
              </li>
              <li>
                <a href="#faq" className="text-[#94A3B8] hover:text-amber-400 transition-colors">Frequently Asked Questions</a>
              </li>
              <li>
                <a href="#" className="text-[#94A3B8] hover:text-amber-400 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-[#94A3B8] hover:text-amber-400 transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-[#94A3B8] hover:text-amber-400 transition-colors">Responsible Gaming (18+)</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Gateways Bar */}
        <div className="pt-8 border-t border-[#141B28] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#94A3B8]">
            <span className="font-semibold text-white">Supported Payment Channels:</span> UPI &middot; PhonePe &middot; Paytm &middot; Google Pay &middot; IMPS Bank Wire &middot; USDT (TRC-20)
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-white px-3.5 py-2 rounded-xl bg-[#0F1420] border border-[#1E283D] hover:bg-[#161E30] transition-colors cursor-pointer font-medium"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Copyright & Official URL */}
        <div className="text-center text-xs text-[#64748B] space-y-1">
          <p>&copy; {new Date().getFullYear()} Official Platform. All rights reserved.</p>
          <p>
            Official Website:{' '}
            <a href="https://maanwin51.com/" className="text-amber-400 font-semibold hover:underline">
              https://maanwin51.com/
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
