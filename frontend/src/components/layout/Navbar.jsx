import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  User,
  LogOut,
  Sparkles,
  ArrowRight,
  Download,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Games', href: '#games' },
    { label: 'About', href: '#about' },
    { label: 'Specifications', href: '#specs' },
    { label: 'How to Play', href: '#how-to-play' },
    { label: 'Rewards & VIP', href: '#rewards' },
    { label: 'App Download', href: '#download' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleSmoothScroll = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      if (!targetId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#07090E]/95 backdrop-blur-md border-b border-[#1A2234] shadow-lg shadow-black/40 py-2.5'
          : 'bg-[#07090E]/80 backdrop-blur-sm border-b border-[#141B2A] py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo using /logo.jpeg */}
          <Link
            to="/"
            className="flex items-center group focus:outline-none"
            aria-label="Home"
          >
            <img
              src="/logo.jpeg"
              alt="Logo"
              className="h-10 sm:h-12 w-auto object-contain rounded-lg transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="px-2.5 py-1.5 text-xs xl:text-sm font-semibold text-[#94A3B8] hover:text-amber-400 rounded-xl hover:bg-[#121824] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2.5">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#131B2A] border border-[#212E46] text-xs sm:text-sm font-bold text-white hover:border-amber-400 transition-all shadow-xs"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <User className="w-4 h-4 text-amber-400" />
                  <span className="max-w-[120px] truncate">{user?.name || 'Account'}</span>
                </Link>

                <button
                  type="button"
                  onClick={logout}
                  title="Sign Out"
                  aria-label="Sign Out"
                  className="p-2 rounded-xl bg-[#0F141F] border border-[#1E273A] text-[#94A3B8] hover:text-white hover:border-amber-400/50 hover:bg-[#161D2B] transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-95 rounded-xl transition-all shadow-md shadow-blue-600/30"
                >
                  Log In
                </Link>

                <Link
                  to="/register"
                  className="relative group px-5 py-2 text-xs sm:text-sm font-black text-black bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-500 active:scale-95 rounded-xl transition-all shadow-md shadow-amber-500/25 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            {!isAuthenticated && (
              <Link
                to="/register"
                className="px-3 py-1.5 text-xs font-bold text-black bg-gradient-to-r from-amber-500 to-amber-400 rounded-xl shadow-xs"
              >
                Register
              </Link>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-xl bg-[#121824] border border-[#212E46] text-[#94A3B8] hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0D15] border-b border-[#1E273A] px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
          <nav className="flex flex-col space-y-1 mb-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="px-3.5 py-2.5 text-sm font-semibold text-[#CBD5E1] hover:text-amber-400 hover:bg-[#121824] rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#1E273A] flex flex-col gap-2.5">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="w-full h-11 flex items-center justify-center gap-2 bg-[#131B2A] text-white font-bold text-sm rounded-xl border border-[#212E46]"
                >
                  <User className="w-4 h-4 text-amber-400" />
                  <span>Go to Dashboard ({user?.name || 'Account'})</span>
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="w-full h-11 flex items-center justify-center gap-2 bg-[#0F141F] text-[#94A3B8] hover:text-white font-semibold text-sm rounded-xl border border-[#1E273A]"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  to="/login"
                  className="h-11 flex items-center justify-center text-sm font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-md shadow-blue-600/30"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="h-11 flex items-center justify-center text-sm font-black text-black bg-gradient-to-r from-amber-500 to-amber-400 rounded-xl shadow-md shadow-amber-500/25"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
