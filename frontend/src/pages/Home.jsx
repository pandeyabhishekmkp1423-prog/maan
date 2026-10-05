import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Download,
  ShieldCheck,
  Zap,
  TrendingUp,
  Award,
  Users,
  Clock,
  HelpCircle,
  ChevronDown,
  CheckCircle2,
  Lock,
  Smartphone,
  Gift,
  Coins,
  CreditCard,
  Layers,
  Flame,
  Star,
  ExternalLink,
  KeyRound,
  FileEdit,
  Palette,
  MessageCircle,
  Timer,
  Hash,
  Compass,
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  // State for active game category filter
  const [selectedCategory, setSelectedCategory] = useState('all');

  // State for interactive FAQ accordion
  const [openFaq, setOpenFaq] = useState(0);

  // State for live simulated Win Go round countdown in hero
  const [countdown, setCountdown] = useState(48);
  const [selectedDemoColor, setSelectedDemoColor] = useState('green');

  useEffect(() => {
    document.title = 'Official Colour Trading Game App — Login, Register & App Download';

    const timer = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 60 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const categories = [
    { id: 'all', label: 'All Games' },
    { id: 'wingo', label: 'Win Go' },
    { id: 'trx', label: 'Trx Win' },
    { id: 'lottery', label: '5D / K3 Lotre' },
    { id: 'slots', label: 'Slots' },
    { id: 'casino', label: 'Live Casino' },
    { id: 'crash', label: 'Aviator' },
  ];

  const gamesList = [
    {
      id: 'wingo-1',
      title: 'Win Go (1 Min / 3 Min)',
      category: 'wingo',
      tag: 'HOT & POPULAR',
      tagColor: 'bg-amber-400/10 text-amber-400 border-amber-400/30',
      description: 'The classic 60-second color prediction game. Predict Red, Green, or Violet with up to 9x multiplier returns.',
      multiplier: '1.98x - 9.0x',
      badge: 'Live Every 60s',
      colorDot: 'bg-amber-400',
    },
    {
      id: 'trx-1',
      title: 'Trx Win Go Hash',
      category: 'trx',
      tag: 'PROVABLY FAIR',
      tagColor: 'bg-blue-400/10 text-blue-400 border-blue-400/30',
      description: 'Decentralized color prediction based on real-time Tron public blockchain block hashes for total transparency.',
      multiplier: '1.98x - 9.0x',
      badge: 'Blockchain Hash',
      colorDot: 'bg-blue-400',
    },
    {
      id: 'lotre-5d',
      title: '5D Lotre Draw',
      category: 'lottery',
      tag: 'HIGH JACKPOT',
      tagColor: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/30',
      description: 'Pick single-digit or multi-digit combinations across 5 revolving lottery wheels for huge jackpot multipliers.',
      multiplier: 'Up to 900x',
      badge: 'Daily Jackpots',
      colorDot: 'bg-emerald-400',
    },
    {
      id: 'k3-lotre',
      title: 'K3 Dice Lotre',
      category: 'lottery',
      tag: 'FAST ROUNDS',
      tagColor: 'bg-purple-400/10 text-purple-400 border-purple-400/30',
      description: 'Predict the sum, triples, or high/low outcomes of three rolling dice in ultra-fast automated intervals.',
      multiplier: '2.0x - 207x',
      badge: '3-Dice System',
      colorDot: 'bg-purple-400',
    },
    {
      id: 'aviator-crash',
      title: 'Aviator & Crash Flight',
      category: 'crash',
      tag: 'TRENDING',
      tagColor: 'bg-rose-400/10 text-rose-400 border-rose-400/30',
      description: 'Watch the multiplier plane climb into the sky and cash out before the crash to multiply your stake.',
      multiplier: '1.01x - 1,000x',
      badge: 'Live Multiplayer',
      colorDot: 'bg-rose-400',
    },
    {
      id: 'jili-slots',
      title: 'Jili & PG Premium Slots',
      category: 'slots',
      tag: '98.5% RTP',
      tagColor: 'bg-amber-400/10 text-amber-300 border-amber-300/30',
      description: 'Over 200+ themed video slots featuring cascading multipliers, free spin rounds, and expanding wilds.',
      multiplier: 'Up to 5,000x',
      badge: '200+ Games',
      colorDot: 'bg-amber-300',
    },
  ];

  const filteredGames = selectedCategory === 'all'
    ? gamesList
    : gamesList.filter((g) => g.category === selectedCategory);

  const faqs = [
    {
      q: 'What is this platform and how does colour trading work?',
      a: 'It is India’s premier verified online colour trading and prediction platform. Players predict color outcomes (Red, Green, Violet) or numerical combinations in fast rounds such as Win Go and Trx Win Go. Correct forecasts result in instant wallet payouts with multipliers ranging from 1.98x up to 9x or higher.',
    },
    {
      q: 'How do I register a new account?',
      a: 'Registration takes less than 30 seconds. Click the "Register" button, select either Mobile Phone (with India +91 or international country codes) or Email, create a secure password, enter an optional invite code, and accept the Terms & Conditions. You will be automatically logged into your account dashboard immediately upon creation.',
    },
    {
      q: 'What is the minimum deposit and minimum withdrawal amount?',
      a: 'The minimum recharge is just ₹100, supporting all Indian UPI apps (PhonePe, Google Pay, Paytm) and IMPS. The minimum withdrawal is ₹110. Withdrawals are processed 24/7 and usually credit to your verified bank account within 1 to 5 minutes.',
    },
    {
      q: 'Is my personal and financial information secure?',
      a: 'Yes. The system operates on bank-grade 256-Bit SSL encryption, secure PHP HttpOnly cookies, and cryptographic password hashing (bcrypt). We never store plain-text passwords or share player details with third parties.',
    },
    {
      q: 'How does the Trx Win Go blockchain game ensure fair play?',
      a: 'Trx Win Go utilizes the cryptographic hash values of live Tron public blockchain blocks. Because Tron block hashes are decentralized, immutable, and generated every second by third-party validators, the outcome is 100% transparent, provably fair, and impossible to manipulate.',
    },
    {
      q: 'How does the referral invite program work?',
      a: 'When you create an account, you receive a unique personal invite code (visible on your dashboard). When friends sign up using your link or code, you earn lifetime multi-tier referral commissions on their gameplay, settled automatically into your balance every 24 hours.',
    },
    {
      q: 'How can I download the official mobile app?',
      a: 'Android users can download the lightweight 18.4 MB official APK by clicking the "Download App" button on this page. iOS users can open the site in Safari, tap the Share icon, and select "Add to Home Screen" to install the fast Progressive Web App (PWA).',
    },
    {
      q: 'What should I do if I forget my login password?',
      a: 'Simply visit the Forgot Password page, enter your registered phone number or email, and request reset instructions. A secure verification token will allow you to choose a new password safely.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#07090E] text-white flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Sticky Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden border-b border-[#161D2B] bg-[#07090E]">
        {/* Ambient Subtle Golden Radial Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[750px] h-[360px] bg-gradient-to-b from-amber-500/20 via-yellow-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />
        <div className="absolute -top-20 right-10 w-80 h-80 bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          {/* Top Verification Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#101625] border border-[#232F46] text-xs sm:text-sm font-bold text-amber-400 shadow-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Official Portal &middot; Verified Fast Payouts &middot; 24/7 Support</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
              Official
            </span>{' '}
            — Colour Trading &amp; Game App
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
            Welcome to India's premier verified color trading and entertainment platform. Experience 1-minute live Win Go rounds, blockchain Trx hash markets, instant 24/7 UPI withdrawals, and guaranteed fair play.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2 max-w-md mx-auto">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="w-full sm:w-auto flex-1 h-13 px-8 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-black font-black text-base rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>Open Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="flex-1 min-w-[150px] h-13 px-6 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-black font-black text-sm sm:text-base rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Register Now</span>
                </Link>

                <Link
                  to="/login"
                  className="flex-1 min-w-[130px] h-13 px-6 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-sm sm:text-base rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <span>Log In</span>
                </Link>
              </>
            )}

            <a
              href="#download"
              className="w-full sm:w-auto h-13 px-6 bg-[#0F1420] hover:bg-[#161D2C] text-white border border-[#232F46] font-bold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download App</span>
            </a>
          </div>

          {/* Interactive Live Color Prediction Preview Box */}
          <div className="max-w-2xl mx-auto rounded-3xl bg-[#0F1420]/90 border border-[#232F46] shadow-2xl p-5 sm:p-6 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between border-b border-[#1C2538] pb-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-extrabold text-white">Win Go 1-Min Live Draw</span>
                <span className="text-xs text-[#94A3B8] font-mono">#20261005089</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono font-black text-sm sm:text-base text-amber-400 bg-[#162032] px-3 py-1 rounded-xl border border-[#232F46]">
                <Clock className="w-4 h-4" />
                <span>00:{countdown < 10 ? `0${countdown}` : countdown}</span>
              </div>
            </div>

            {/* Prediction Chips */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setSelectedDemoColor('green')}
                className={`py-3.5 px-4 rounded-2xl font-black text-sm flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                  selectedDemoColor === 'green'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 scale-102 ring-2 ring-emerald-400'
                    : 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 hover:bg-emerald-900/40'
                }`}
              >
                <span>GREEN</span>
                <span className="text-[11px] font-mono opacity-90">2.0x Payout</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedDemoColor('violet')}
                className={`py-3.5 px-4 rounded-2xl font-black text-sm flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                  selectedDemoColor === 'violet'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30 scale-102 ring-2 ring-purple-400'
                    : 'bg-purple-950/40 text-purple-300 border border-purple-800/40 hover:bg-purple-900/40'
                }`}
              >
                <span>VIOLET</span>
                <span className="text-[11px] font-mono opacity-90">4.5x Payout</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedDemoColor('red')}
                className={`py-3.5 px-4 rounded-2xl font-black text-sm flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                  selectedDemoColor === 'red'
                    ? 'bg-[#E53935] text-white shadow-lg shadow-red-500/30 scale-102 ring-2 ring-red-400'
                    : 'bg-red-950/40 text-red-300 border border-red-800/40 hover:bg-red-900/40'
                }`}
              >
                <span>RED</span>
                <span className="text-[11px] font-mono opacity-90">2.0x Payout</span>
              </button>
            </div>

            {/* Recent Results History Row */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-[#94A3B8] font-semibold">Recent Results:</span>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center shadow-xs">3</span>
                <span className="w-6 h-6 rounded-full bg-[#E53935] text-white font-bold text-[10px] flex items-center justify-center shadow-xs">8</span>
                <span className="w-6 h-6 rounded-full bg-purple-500 text-white font-bold text-[10px] flex items-center justify-center shadow-xs">0</span>
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center shadow-xs">7</span>
                <span className="w-6 h-6 rounded-full bg-[#E53935] text-white font-bold text-[10px] flex items-center justify-center shadow-xs">2</span>
              </div>
              <Link
                to={isAuthenticated ? '/dashboard' : '/register'}
                className="font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 hover:underline"
              >
                <span>Trade Live</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-[#0F1420] border border-[#1E2638] shadow-md flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-[#94A3B8] font-semibold">Payout Speed</div>
                <div className="text-sm font-extrabold text-white">1–5 Min UPI</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F1420] border border-[#1E2638] shadow-md flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-[#94A3B8] font-semibold">Fairness</div>
                <div className="text-sm font-extrabold text-white">100% Certified</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F1420] border border-[#1E2638] shadow-md flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-400/10 border border-blue-400/20 text-blue-400 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-[#94A3B8] font-semibold">Player Base</div>
                <div className="text-sm font-extrabold text-white">5,000,000+</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F1420] border border-[#1E2638] shadow-md flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-[#94A3B8] font-semibold">Welcome Gift</div>
                <div className="text-sm font-extrabold text-white">100% Bonus</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: QUICK ACCESS — EXACT REFERENCE MATCH (DARK THEME) */}
      <section id="quick-access" className="py-20 sm:py-24 bg-[#07090E] border-b border-[#161D2B] text-white relative overflow-hidden">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-blue-600/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Quick Access — Everything in One Place
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              Everything in one place. Use the cards below to jump straight to the page you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Login */}
            <div className="group rounded-[22px] bg-[#0F141F] hover:bg-[#121927] border border-[#1A2232] hover:border-[#2B384E] p-7 transition-all duration-300 shadow-md hover:-translate-y-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-[#171F2E] border border-[#232F46] flex items-center justify-center text-xl shrink-0">
                  <span>🔐</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Login</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Log in with your registered mobile number and password on the login page. Forgot password option available.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-[#161E2E]">
                <Link
                  to="/login"
                  className="text-sm font-bold text-[#F59E0B] hover:text-[#FBBF24] inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-all"
                >
                  <span>Login Now</span>
                  <span className="text-base leading-none">&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Card 2: Register */}
            <div className="group rounded-[22px] bg-[#0F141F] hover:bg-[#121927] border border-[#1A2232] hover:border-[#2B384E] p-7 transition-all duration-300 shadow-md hover:-translate-y-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-[#171F2E] border border-[#232F46] flex items-center justify-center text-xl shrink-0">
                  <span>📝</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Register</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Create a new account in 30 seconds. Mobile number, password and invite code to complete registration.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-[#161E2E]">
                <Link
                  to="/register"
                  className="text-sm font-bold text-[#F59E0B] hover:text-[#FBBF24] inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-all"
                >
                  <span>Register Free</span>
                  <span className="text-base leading-none">&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Card 3: App Download */}
            <div className="group rounded-[22px] bg-[#0F141F] hover:bg-[#121927] border border-[#1A2232] hover:border-[#2B384E] p-7 transition-all duration-300 shadow-md hover:-translate-y-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-[#171F2E] border border-[#232F46] flex items-center justify-center text-xl shrink-0">
                  <span>📲</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">App Download</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Download APK, install it and enjoy fast colour trading on mobile. Android supported.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-[#161E2E]">
                <a
                  href="#download"
                  className="text-sm font-bold text-[#F59E0B] hover:text-[#FBBF24] inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-all"
                >
                  <span>Download APK</span>
                  <span className="text-base leading-none">&rarr;</span>
                </a>
              </div>
            </div>

            {/* Card 4: Colour Trading */}
            <div className="group rounded-[22px] bg-[#0F141F] hover:bg-[#121927] border border-[#1A2232] hover:border-[#2B384E] p-7 transition-all duration-300 shadow-md hover:-translate-y-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-[#171F2E] border border-[#232F46] flex items-center justify-center text-xl shrink-0">
                  <span>🎨</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Colour Trading</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Learn how to play colour trading — rules, timing, and complete guide with tips for beginners.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-[#161E2E]">
                <a
                  href="#game-modes"
                  className="text-sm font-bold text-[#F59E0B] hover:text-[#FBBF24] inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-all"
                >
                  <span>Read Guide</span>
                  <span className="text-base leading-none">&rarr;</span>
                </a>
              </div>
            </div>

            {/* Card 5: FAQ */}
            <div className="group rounded-[22px] bg-[#0F141F] hover:bg-[#121927] border border-[#1A2232] hover:border-[#2B384E] p-7 transition-all duration-300 shadow-md hover:-translate-y-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-[#171F2E] border border-[#232F46] flex items-center justify-center text-xl shrink-0">
                  <span>❓</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">FAQ</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  The most asked questions — login issues, register problems, APK install errors, password reset and more.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-[#161E2E]">
                <a
                  href="#faq"
                  className="text-sm font-bold text-[#F59E0B] hover:text-[#FBBF24] inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-all"
                >
                  <span>See Answers</span>
                  <span className="text-base leading-none">&rarr;</span>
                </a>
              </div>
            </div>

            {/* Card 6: Help & Support */}
            <div className="group rounded-[22px] bg-[#0F141F] hover:bg-[#121927] border border-[#1A2232] hover:border-[#2B384E] p-7 transition-all duration-300 shadow-md hover:-translate-y-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-[#171F2E] border border-[#232F46] flex items-center justify-center text-xl shrink-0">
                  <span>💬</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Help &amp; Support</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Any issue? Contact our support team. Official links connect automatically from the config file.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-[#161E2E]">
                <a
                  href="#faq"
                  className="text-sm font-bold text-[#F59E0B] hover:text-[#FBBF24] inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-all"
                >
                  <span>Contact Us</span>
                  <span className="text-base leading-none">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PLATFORM OVERVIEW & ABOUT */}
      <section id="about" className="py-16 sm:py-20 border-b border-[#161D2B] bg-[#0A0D18]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-400/10 border border-blue-400/20 text-xs font-bold text-blue-400">
              <Layers className="w-3.5 h-3.5" />
              <span>Platform Knowledge</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Platform Overview &amp; Fair Play Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0F1420] border border-[#1E2638] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-400/10 text-blue-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Provably Fair System</h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Trx Win Go outcomes are derived directly from the immutable, decentralized block hashes of the Tron public blockchain.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0F1420] border border-[#1E2638] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Bank-Grade Encryption</h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Protected with 256-Bit SSL, secure PHP HttpOnly cookies, and cryptographic password hashing (bcrypt) to ensure safe access.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0F1420] border border-[#1E2638] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Instant UPI Settlement</h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Automated deposit and withdrawal pipelines credit winnings directly into your UPI or bank account in 1 to 5 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SPECIFICATIONS TABLE */}
      <section id="specs" className="py-16 sm:py-20 border-b border-[#161D2B] bg-[#07090E]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              App Overview &amp; Specifications
            </h2>
            <p className="text-sm text-[#94A3B8]">
              Key operational parameters, limits, and technical specifications for the platform.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#1E283D] shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#101625] border-b border-[#1E283D] text-amber-400 font-bold uppercase tracking-wider">
                    <th className="py-4 px-5">Attribute / Parameter</th>
                    <th className="py-4 px-5">Official Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#182030] bg-[#0C101A] text-[#94A3B8]">
                  <tr className="hover:bg-[#121826] transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-white">Platform Classification</td>
                    <td className="py-3.5 px-5 font-bold text-amber-400">Official Colour Trading &amp; Games</td>
                  </tr>
                  <tr className="hover:bg-[#121826] transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-white">Official Domain</td>
                    <td className="py-3.5 px-5 font-mono text-emerald-400 font-semibold">https://maanwin51.com/</td>
                  </tr>
                  <tr className="hover:bg-[#121826] transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-white">Latest Version</td>
                    <td className="py-3.5 px-5 text-white">v3.8.2 (2026 Edition)</td>
                  </tr>
                  <tr className="hover:bg-[#121826] transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-white">APK File Size</td>
                    <td className="py-3.5 px-5 text-white">18.4 MB (Ultra Lightweight)</td>
                  </tr>
                  <tr className="hover:bg-[#121826] transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-white">Minimum Deposit</td>
                    <td className="py-3.5 px-5 font-bold text-white">₹100</td>
                  </tr>
                  <tr className="hover:bg-[#121826] transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-white">Minimum Withdrawal</td>
                    <td className="py-3.5 px-5 font-bold text-white">₹110</td>
                  </tr>
                  <tr className="hover:bg-[#121826] transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-white">Withdrawal Speed</td>
                    <td className="py-3.5 px-5 text-emerald-400 font-semibold">1 – 5 Minutes (Instant IMPS / UPI)</td>
                  </tr>
                  <tr className="hover:bg-[#121826] transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-white">Daily Withdrawal Limit</td>
                    <td className="py-3.5 px-5 text-white">Unlimited Times / No Cap</td>
                  </tr>
                  <tr className="hover:bg-[#121826] transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-white">Operating Systems</td>
                    <td className="py-3.5 px-5 text-white">Android, iOS (Safari PWA), Windows PC, Mac</td>
                  </tr>
                  <tr className="hover:bg-[#121826] transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-white">Payment Options</td>
                    <td className="py-3.5 px-5 text-white">PhonePe, Paytm, Google Pay, UPI QR, Net Banking, USDT (TRC-20)</td>
                  </tr>
                  <tr className="hover:bg-[#121826] transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-white">Security Infrastructure</td>
                    <td className="py-3.5 px-5 text-white">256-Bit SSL, Secure Session Cookies, Rate-Limiting Protection</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: POPULAR GAMES SHOWCASE */}
      <section id="games" className="py-16 sm:py-20 border-b border-[#161D2B] bg-[#0A0D18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-bold text-amber-400">
              <Flame className="w-3.5 h-3.5" />
              <span>Exciting Game Markets</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Popular Online Games &amp; Prediction Markets
            </h2>
            <p className="text-sm text-[#94A3B8]">
              Choose from rapid 60-second color prediction rounds, cryptographic blockchain markets, slots, and multiplayer crash games.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black font-extrabold shadow-md shadow-amber-500/25'
                    : 'bg-[#0F1420] text-[#94A3B8] hover:text-white border border-[#1E2638] hover:bg-[#161D2C]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                className="group relative rounded-3xl bg-[#0F1420] hover:bg-[#131A29] border border-[#1E2638] hover:border-amber-400/40 p-6 transition-all duration-300 shadow-md hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Badge Row */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${game.tagColor}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${game.colorDot}`} />
                      {game.tag}
                    </span>
                    <span className="text-xs font-semibold text-[#94A3B8] bg-[#162032] px-2.5 py-1 rounded-lg border border-[#232F46]">
                      {game.badge}
                    </span>
                  </div>

                  {/* Title & Multiplier */}
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {game.title}
                    </h3>
                    <div className="mt-1 text-xs text-amber-400 font-mono font-bold">
                      Payout Multiplier: {game.multiplier}
                    </div>
                  </div>

                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {game.description}
                  </p>
                </div>

                {/* Card Action */}
                <div className="pt-6 mt-4 border-t border-[#1A2234] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Instant Settlement</span>
                  </div>

                  <Link
                    to={isAuthenticated ? '/dashboard' : '/login'}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#162032] hover:bg-amber-400 text-amber-400 hover:text-black font-bold text-xs transition-all border border-amber-400/30"
                  >
                    <span>Play Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: STEP-BY-STEP GUIDE */}
      <section id="how-to-play" className="py-16 sm:py-20 border-b border-[#161D2B] bg-[#07090E]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-bold text-amber-400">
              <Award className="w-3.5 h-3.5" />
              <span>Easy Getting Started</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              How to Register, Play &amp; Win
            </h2>
            <p className="text-sm text-[#94A3B8]">
              Follow these 4 simple steps to begin trading colors and cashing out instant winnings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#1E2638] shadow-md space-y-4 hover:border-amber-400/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-400 border border-amber-400/30 flex items-center justify-center font-extrabold text-lg">
                01
              </div>
              <h3 className="text-lg font-bold text-white">1. Create Account</h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Click Register and sign up in under 30 seconds with your mobile number or email. You are automatically logged in upon completion.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#1E2638] shadow-md space-y-4 hover:border-amber-400/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-400 border border-amber-400/30 flex items-center justify-center font-extrabold text-lg">
                02
              </div>
              <h3 className="text-lg font-bold text-white">2. Fund Your Wallet</h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Recharge starting at just ₹100 using PhonePe, Paytm, Google Pay, or UPI QR code. Receive your 100% first deposit bonus instantly.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#1E2638] shadow-md space-y-4 hover:border-amber-400/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-400 border border-amber-400/30 flex items-center justify-center font-extrabold text-lg">
                03
              </div>
              <h3 className="text-lg font-bold text-white">3. Predict &amp; Play</h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Select Win Go or Trx Win Go, analyze color trends (Red, Green, Violet), and place your forecast. Rounds resolve live every 60 seconds.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#1E2638] shadow-md space-y-4 hover:border-amber-400/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-400 border border-amber-400/30 flex items-center justify-center font-extrabold text-lg">
                04
              </div>
              <h3 className="text-lg font-bold text-white">4. Instant Cashout</h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Request withdrawal of your profits starting at ₹110 directly to your bank account or UPI ID with 1 to 5-minute automated processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: COLOUR TRADING GAME MODES — EXACT REFERENCE MATCH */}
      <section id="game-modes" className="py-20 sm:py-24 bg-[#0A0D18] border-b border-[#161D2B] text-white relative overflow-hidden">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-blue-500/10 via-indigo-600/5 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Colour Trading Game Modes
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8]">
              Different round timings — choose what fits your style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mode 1: 30 Seconds */}
            <div className="rounded-[22px] bg-[#0F141F] hover:bg-[#121927] border border-[#1A2232] hover:border-[#2B384E] p-7 transition-all duration-300 shadow-md hover:-translate-y-1 space-y-4">
              <div className="w-11 h-11 rounded-xl bg-[#171F2E] border border-[#232F46] flex items-center justify-center text-xl shrink-0">
                <span>⏰</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">30 Seconds Round</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                The fastest round. A new result every 30 seconds. Best for users who make quick decisions.
              </p>
            </div>

            {/* Mode 2: 1 Minute */}
            <div className="rounded-[22px] bg-[#0F141F] hover:bg-[#121927] border border-[#1A2232] hover:border-[#2B384E] p-7 transition-all duration-300 shadow-md hover:-translate-y-1 space-y-4">
              <div className="w-11 h-11 rounded-xl bg-[#171F2E] border border-[#232F46] flex items-center justify-center text-xl shrink-0">
                <span>⏱️</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">1 Minute Round</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                A 1-minute timer. Perfect for beginners — gives you a bit of thinking time.
              </p>
            </div>

            {/* Mode 3: 3 Minutes */}
            <div className="rounded-[22px] bg-[#0F141F] hover:bg-[#121927] border border-[#1A2232] hover:border-[#2B384E] p-7 transition-all duration-300 shadow-md hover:-translate-y-1 space-y-4">
              <div className="w-11 h-11 rounded-xl bg-[#171F2E] border border-[#232F46] flex items-center justify-center text-xl shrink-0">
                <span>🕒</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">3 Minutes Round</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Balanced speed and thinking time. For users who do light analysis.
              </p>
            </div>

            {/* Mode 4: 5 Minutes */}
            <div className="rounded-[22px] bg-[#0F141F] hover:bg-[#121927] border border-[#1A2232] hover:border-[#2B384E] p-7 transition-all duration-300 shadow-md hover:-translate-y-1 space-y-4">
              <div className="w-11 h-11 rounded-xl bg-[#171F2E] border border-[#232F46] flex items-center justify-center text-xl shrink-0">
                <span>⌛</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">5 Minutes Round</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Calm, unhurried play. Time to make decisions without any rush.
              </p>
            </div>

            {/* Mode 5: Colour Prediction */}
            <div className="rounded-[22px] bg-[#0F141F] hover:bg-[#121927] border border-[#1A2232] hover:border-[#2B384E] p-7 transition-all duration-300 shadow-md hover:-translate-y-1 space-y-4">
              <div className="w-11 h-11 rounded-xl bg-[#171F2E] border border-[#232F46] flex items-center justify-center text-xl shrink-0">
                <span>🎨</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">Colour Prediction</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Choose between Green, Red and Violet. Correct colour earns the payout.
              </p>
            </div>

            {/* Mode 6: Number Prediction */}
            <div className="rounded-[22px] bg-[#0F141F] hover:bg-[#121927] border border-[#1A2232] hover:border-[#2B384E] p-7 transition-all duration-300 shadow-md hover:-translate-y-1 space-y-4">
              <div className="w-11 h-11 rounded-xl bg-[#171F2E] border border-[#232F46] flex items-center justify-center text-xl shrink-0">
                <span>🔢</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">Number Prediction</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Pick a number from 0 to 9. Higher risk, higher payout.
              </p>
            </div>
          </div>

          {/* Centered Read Guide Button with Radiant Blue Glow matching screenshot */}
          <div className="text-center pt-8">
            <a
              href="#how-to-play"
              className="inline-flex items-center justify-center gap-2 px-9 py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-sm sm:text-base rounded-full shadow-[0_0_30px_rgba(37,99,235,0.7)] hover:shadow-[0_0_40px_rgba(37,99,235,0.9)] active:scale-95 transition-all cursor-pointer"
            >
              <span>Read the Full Game Guide</span>
              <span className="text-lg leading-none">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 7: BONUSES, VIP REWARDS & PROMOTIONS */}
      <section id="rewards" className="py-16 sm:py-20 border-b border-[#161D2B] bg-[#07090E]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-bold text-amber-400">
              <Gift className="w-3.5 h-3.5" />
              <span>Exclusive Player Perks</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Bonuses, VIP Rewards &amp; <span className="text-amber-400">Promotions</span>
            </h2>
            <p className="text-sm text-[#94A3B8]">
              Maximize your gameplay with first recharge bonuses, streak attendance rewards, and generous referral commissions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#1E2638] hover:border-amber-400/40 shadow-md space-y-3 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                <Gift className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">100% First Deposit</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Double your initial recharge on your first deposit up to ₹50,000 for extended trading power.
              </p>
              <div className="text-xs font-bold text-amber-400 pt-2">Claim in Promotions</div>
            </div>

            <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#1E2638] hover:border-emerald-400/40 shadow-md space-y-3 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Daily Streak Bonus</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Log in daily to claim incremental attendance cash bonuses that escalate up to ₹5,000 each week.
              </p>
              <div className="text-xs font-bold text-emerald-400 pt-2">Daily Free Claim</div>
            </div>

            <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#1E2638] hover:border-blue-400/40 shadow-md space-y-3 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-400/10 text-blue-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Refer &amp; Earn</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Share your invite code to receive multi-tier daily commissions from Level 1, 2, and 3 downline trades.
              </p>
              <div className="text-xs font-bold text-blue-400 pt-2">Automated Settlement</div>
            </div>

            <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#1E2638] hover:border-purple-400/40 shadow-md space-y-3 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-400/10 text-purple-400 flex items-center justify-center">
                <Star className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">VIP Club Privileges</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Progress from VIP 1 to VIP 10 for weekly cash rebates, birthday bonuses, and priority manager access.
              </p>
              <div className="text-xs font-bold text-purple-400 pt-2">VIP 1 – VIP 10</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: APP DOWNLOAD GUIDE */}
      <section id="download" className="py-16 sm:py-20 border-b border-[#161D2B] bg-[#0A0D18]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-400/10 border border-blue-400/20 text-xs font-bold text-blue-400">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile First Experience</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Download the Official <span className="text-amber-400">Mobile App</span>
            </h2>
            <p className="text-sm text-[#94A3B8]">
              Fast, secure, and lightweight (18.4 MB). Enjoy round-the-clock color prediction directly from your phone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Android Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0F1420] border border-[#1E2638] flex flex-col justify-between space-y-6 shadow-md">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/30">
                    ANDROID APK
                  </span>
                  <span className="text-xs text-[#94A3B8] font-mono">Size: 18.4 MB</span>
                </div>
                <h3 className="text-xl font-bold text-white">Direct Android APK Install</h3>
                <ol className="text-xs sm:text-sm text-[#94A3B8] space-y-2 list-decimal list-inside leading-relaxed">
                  <li>Click "Download Android APK" below to get the official package.</li>
                  <li>Enable "Install from Unknown Sources" in device settings if prompted.</li>
                  <li>Open the APK file and tap Install. Launch &amp; Sign in.</li>
                </ol>
              </div>

              <a
                href="/logo.jpeg"
                download="Official_App.apk"
                className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm shadow-md transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Android APK (18.4 MB)</span>
              </a>
            </div>

            {/* iOS Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0F1420] border border-[#1E2638] flex flex-col justify-between space-y-6 shadow-md">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-400/10 text-blue-400 border border-blue-400/30">
                    APPLE iOS / SAFARI
                  </span>
                  <span className="text-xs text-[#94A3B8] font-mono">PWA Web App</span>
                </div>
                <h3 className="text-xl font-bold text-white">Apple iOS Web App (PWA)</h3>
                <ol className="text-xs sm:text-sm text-[#94A3B8] space-y-2 list-decimal list-inside leading-relaxed">
                  <li>Open the site in Safari on your iPhone.</li>
                  <li>Tap the standard "Share" icon at the bottom of Safari.</li>
                  <li>Select "Add to Home Screen" to install the app icon.</li>
                </ol>
              </div>

              <Link
                to="/register"
                className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-[#162032] hover:bg-[#1E2B44] text-white font-bold text-sm border border-[#232F46] transition-all"
              >
                <span>Launch Web Version</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: FAQ */}
      <section id="faq" className="py-16 sm:py-20 border-b border-[#161D2B] bg-[#07090E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-bold text-amber-400">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Questions Answered</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions (<span className="text-amber-400">FAQ</span>)
            </h2>
            <p className="text-sm text-[#94A3B8]">
              Everything you need to know about registering, playing, and withdrawing.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl bg-[#0F1420] border border-[#1E2638] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-white hover:text-amber-400 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-[#1C2538] pt-3 bg-[#0C101A]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 10: PRE-FOOTER ACTION BANNER */}
      <section className="py-16 sm:py-20 bg-[#0A0D18] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0F1420] via-[#141B2A] to-[#0F1420] border border-[#232F46] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                Instant Access &middot; 24/7 Payouts
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Ready to Start Playing Today?
              </h2>
              <p className="text-sm text-[#94A3B8]">
                Register your account in 30 seconds and start trading colors with a 100% welcome recharge bonus!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                to="/register"
                className="w-full sm:w-auto h-12 px-7 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto h-12 px-6 bg-[#0F1420] hover:bg-[#161D2C] text-white font-bold text-sm rounded-xl border border-[#232F46] transition-all flex items-center justify-center shadow-xs"
              >
                <span>Sign In</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
