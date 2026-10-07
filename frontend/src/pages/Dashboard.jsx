import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Calendar,
  Clock,
  LogOut,
  Copy,
  Check,
  Bell,
  CheckCircle2,
  ExternalLink,
  Lock,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

const Dashboard = () => {
  const { user, logout, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);
  const [notificationState, setNotificationState] = useState('prompt'); // 'prompt' | 'granted' | 'denied' | 'dismissed'
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    document.title = 'MaanWin51 — Dashboard';

    // Ensure noindex meta tag for search engines
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'noindex, nofollow');

    // Check if browser notifications supported & status
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        setNotificationState('granted');
      } else if (Notification.permission === 'denied') {
        setNotificationState('denied');
      }
    }

    return () => {
      // Revert robots meta when leaving dashboard
      if (metaRobots) {
        metaRobots.setAttribute('content', 'index, follow');
      }
    };
  }, []);

  const handleCopyInviteCode = () => {
    if (user?.invite_code) {
      navigator.clipboard.writeText(user.invite_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRequestNotification = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        setNotificationState(permission);
      } catch (err) {
        console.error('Notification error:', err);
      }
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (err) {
      console.error(err);
    } finally {
      setLoggingOut(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recently';
    try {
      const d = new Date(dateStr.replace(' ', 'T'));
      return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] flex flex-col text-slate-100">
      {/* Top Navbar */}
      <header className="w-full bg-[#07090E]/90 border-b border-[#141B2A] backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" aria-label="Home">
              <img
                src="/logo.jpeg"
                alt="Logo"
                className="h-10 sm:h-12 w-auto object-contain rounded-lg"
              />
            </Link>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#0F1420] border border-[#1E283D] text-amber-400">
              Dashboard
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              fullWidth={false}
              loading={loggingOut}
              loadingText="Logging out..."
              onClick={handleLogout}
              icon={LogOut}
              className="text-xs sm:text-sm"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Welcome Greeting Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0F1420] via-[#141B2A] to-[#0F1420] border border-[#1E283D] shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Verified Session Active
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">{user?.name || 'MaanWin51 User'}</span>
            </h1>
            <p className="text-sm text-[#94A3B8]">
              Your authenticated session is active and secured with HttpOnly cookies and database verification.
            </p>
          </div>

          {/* Quick Refresh */}
          <div className="shrink-0 flex items-center gap-2">
            <button
              type="button"
              onClick={refreshUser}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#0A0D15] border border-[#1E283D] hover:border-amber-400/40 text-slate-200 hover:text-white transition-colors cursor-pointer"
            >
              Sync Profile
            </button>
          </div>
        </div>

        {/* User Account Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Account Information */}
          <div className="md:col-span-2 bg-[#0F1420] rounded-3xl border border-[#1E283D] p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#141B2A] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                  <User className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-white">Account Information</h2>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950/40 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {user?.status || 'Active'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="p-4 rounded-2xl bg-[#0A0D15] border border-[#1E283D]">
                <div className="text-xs font-semibold text-[#64748B] mb-1">Display Name</div>
                <div className="text-base font-bold text-white">{user?.name || 'User'}</div>
              </div>

              {/* User ID */}
              <div className="p-4 rounded-2xl bg-[#0A0D15] border border-[#1E283D]">
                <div className="text-xs font-semibold text-[#64748B] mb-1">User ID</div>
                <div className="text-base font-mono font-bold text-amber-400">#{user?.id}</div>
              </div>

              {/* Phone */}
              <div className="p-4 rounded-2xl bg-[#0A0D15] border border-[#1E283D]">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B] mb-1">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Phone Number</span>
                </div>
                <div className="text-base font-bold text-white">
                  {user?.phone ? (
                    <span>
                      <span className="text-xs font-semibold text-amber-400/80 mr-1.5">{user.country_code}</span>
                      {user.phone}
                    </span>
                  ) : (
                    <span className="text-sm text-[#64748B] font-normal">Not configured</span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="p-4 rounded-2xl bg-[#0A0D15] border border-[#1E283D]">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B] mb-1">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Email Address</span>
                </div>
                <div className="text-base font-bold text-white truncate">
                  {user?.email || <span className="text-sm text-[#64748B] font-normal">Not configured</span>}
                </div>
              </div>

              {/* Registered At */}
              <div className="p-4 rounded-2xl bg-[#0A0D15] border border-[#1E283D]">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B] mb-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Registered On</span>
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  {formatDate(user?.created_at)}
                </div>
              </div>

              {/* Last Login */}
              <div className="p-4 rounded-2xl bg-[#0A0D15] border border-[#1E283D]">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B] mb-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Last Sign-In</span>
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  {formatDate(user?.last_login_at)}
                </div>
              </div>
            </div>

            {/* Invite / Referral Code */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#141B2A] to-[#0A0D15] border border-amber-500/30 flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    Your Unique Referral Code
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xl font-mono font-extrabold text-white tracking-widest bg-[#0b1222] px-3 py-1 rounded-xl border border-amber-500/20">
                      {user?.invite_code || 'MWDEFAULT'}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      Active &bull; Verified
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyInviteCode}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-xs font-extrabold text-black rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer active:scale-95"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const link = `${window.location.origin}/register?ref=${user?.invite_code || ''}`;
                      navigator.clipboard.writeText(link);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold rounded-xl border border-slate-700 transition-all cursor-pointer active:scale-95"
                    title="Copy registration referral URL"
                  >
                    <span>Copy Link</span>
                  </button>
                </div>
              </div>

              {user?.referred_by_code && (
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Referred by Sponsor:</span>
                  <span className="font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
                    {user.referred_by_code}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Security & Session Status */}
          <div className="bg-[#0F1420] rounded-3xl border border-[#1E283D] p-6 sm:p-7 shadow-2xl space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 border-b border-[#141B2A] pb-4">
                <div className="w-9 h-9 rounded-xl bg-emerald-950/40 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Security Status</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0A0D15] border border-[#1E283D]">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-white">Secure Cookie Session</p>
                    <p className="text-[#94A3B8]">HttpOnly, SameSite=Lax enabled</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0A0D15] border border-[#1E283D]">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-white">Password Cryptography</p>
                    <p className="text-[#94A3B8]">Bcrypt hashed via PHP password_hash</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0A0D15] border border-[#1E283D]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-white">Server Authority</p>
                    <p className="text-[#94A3B8]">Real-time MySQL active status verification</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Logout Action Card */}
            <div className="pt-4 border-t border-[#141B2A]">
              <Button
                type="button"
                variant="secondary"
                loading={loggingOut}
                loadingText="Signing out..."
                onClick={handleLogout}
                fullWidth
                icon={LogOut}
              >
                Sign Out of MaanWin51
              </Button>
            </div>
          </div>
        </div>

        {/* Optional Notification Consent Box */}
        {notificationState === 'prompt' && (
          <div className="p-5 sm:p-6 rounded-3xl bg-[#0F1420] border border-[#1E283D] shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Enable Important Account Notifications</h4>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  Receive important account security alerts and verification updates directly in your browser.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setNotificationState('dismissed')}
                className="px-4 py-2 text-xs font-semibold text-[#94A3B8] hover:text-white rounded-xl hover:bg-[#141B2A] transition-colors cursor-pointer"
              >
                Not now
              </button>
              <button
                type="button"
                onClick={handleRequestNotification}
                className="px-4 py-2 text-xs font-extrabold text-black bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-500 rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                Enable Notifications
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Clean Dashboard Footer */}
      <footer className="border-t border-[#141B2A] py-6 text-center text-xs text-[#64748B]">
        MaanWin51 Production Authentication System &middot; https://maanwin51.com/
      </footer>
    </div>
  );
};

export default Dashboard;
