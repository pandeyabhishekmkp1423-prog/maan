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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Top Navbar */}
      <header className="w-full bg-white border-b border-[#E5E7EB] sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" aria-label="Home">
              <img
                src="/logo.jpeg"
                alt="Logo"
                className="h-10 sm:h-12 w-auto object-contain rounded-lg"
              />
            </Link>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-[#6B7280]">
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
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white via-white to-[#FFF5F5] border border-[#E5E7EB] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-[#16A34A] border border-green-200 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              Verified Session Active
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight">
              Welcome back, <span className="text-[#E53935]">{user?.name || 'MaanWin51 User'}</span>
            </h1>
            <p className="text-sm text-[#6B7280]">
              Your authenticated session is active and secured with HttpOnly cookies and database verification.
            </p>
          </div>

          {/* Quick Refresh */}
          <div className="shrink-0 flex items-center gap-2">
            <button
              type="button"
              onClick={refreshUser}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#4B5563] transition-colors cursor-pointer"
            >
              Sync Profile
            </button>
          </div>
        </div>

        {/* User Account Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Account Information */}
          <div className="md:col-span-2 bg-white rounded-3xl border border-[#E5E7EB] p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#FFF5F5] text-[#E53935] flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-[#111827]">Account Information</h2>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {user?.status || 'Active'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB]">
                <div className="text-xs font-semibold text-[#6B7280] mb-1">Display Name</div>
                <div className="text-base font-bold text-[#111827]">{user?.name || 'User'}</div>
              </div>

              {/* User ID */}
              <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB]">
                <div className="text-xs font-semibold text-[#6B7280] mb-1">User ID</div>
                <div className="text-base font-mono font-bold text-[#111827]">#{user?.id}</div>
              </div>

              {/* Phone */}
              <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB]">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] mb-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Phone Number</span>
                </div>
                <div className="text-base font-bold text-[#111827]">
                  {user?.phone ? (
                    <span>
                      <span className="text-xs font-semibold text-[#6B7280] mr-1.5">{user.country_code}</span>
                      {user.phone}
                    </span>
                  ) : (
                    <span className="text-sm text-[#9CA3AF] font-normal">Not configured</span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB]">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] mb-1">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Address</span>
                </div>
                <div className="text-base font-bold text-[#111827] truncate">
                  {user?.email || <span className="text-sm text-[#9CA3AF] font-normal">Not configured</span>}
                </div>
              </div>

              {/* Registered At */}
              <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB]">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Registered On</span>
                </div>
                <div className="text-sm font-semibold text-[#111827]">
                  {formatDate(user?.created_at)}
                </div>
              </div>

              {/* Last Login */}
              <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB]">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Last Sign-In</span>
                </div>
                <div className="text-sm font-semibold text-[#111827]">
                  {formatDate(user?.last_login_at)}
                </div>
              </div>
            </div>

            {/* Invite / Referral Code */}
            <div className="p-4 rounded-2xl bg-[#FFF5F5] border border-[#FEE2E2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-[#C62828] uppercase tracking-wider block">
                  Your Personal Invite Code
                </span>
                <span className="text-lg font-mono font-extrabold text-[#111827]">
                  {user?.invite_code || 'MWDEFAULT'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyInviteCode}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-[#FEE2E2] text-xs font-bold text-[#E53935] rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card 2: Security & Session Status */}
          <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 sm:p-7 shadow-xs space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 border-b border-[#F1F5F9] pb-4">
                <div className="w-9 h-9 rounded-xl bg-green-50 text-[#16A34A] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#111827]">Security Status</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                  <Lock className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-[#111827]">Secure Cookie Session</p>
                    <p className="text-[#6B7280]">HttpOnly, SameSite=Lax enabled</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                  <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-[#111827]">Password Cryptography</p>
                    <p className="text-[#6B7280]">Bcrypt hashed via PHP password_hash</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-[#111827]">Server Authority</p>
                    <p className="text-[#6B7280]">Real-time MySQL active status verification</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Logout Action Card */}
            <div className="pt-4 border-t border-[#F1F5F9]">
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

        {/* Optional Notification Consent Box (Per Spec Rule 41) */}
        {notificationState === 'prompt' && (
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#FFF5F5] text-[#E53935] flex items-center justify-center shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#111827]">Enable Important Account Notifications</h4>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Receive important account security alerts and verification updates directly in your browser.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setNotificationState('dismissed')}
                className="px-4 py-2 text-xs font-semibold text-[#6B7280] hover:text-[#111827] rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Not now
              </button>
              <button
                type="button"
                onClick={handleRequestNotification}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#E53935] hover:bg-[#C62828] rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Enable Notifications
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Clean Dashboard Footer */}
      <footer className="border-t border-[#E5E7EB] py-6 text-center text-xs text-[#9CA3AF]">
        MaanWin51 Production Authentication System &middot; https://maanwin51.com/
      </footer>
    </div>
  );
};

export default Dashboard;
