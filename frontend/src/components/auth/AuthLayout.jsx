import React, { useState } from 'react';
import { ShieldCheck, Lock, Smartphone, Zap, CheckCircle2, X } from 'lucide-react';
import AuthHeader from './AuthHeader';

const AuthLayout = ({
  children,
  showBack = false,
  backTo = '/login',
  backLabel = 'Back to Login',
  title,
  subtitle,
}) => {
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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <AuthHeader showBack={showBack} backTo={backTo} backLabel={backLabel} />

      <main className="flex-1 flex w-full">
        {/* Left Side: Brand Visual Panel (Desktop only, 50% width) */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-white via-[#FFF5F5] to-[#FEE2E2]/30 border-r border-[#E5E7EB] p-12 xl:p-16 flex-col justify-between relative overflow-hidden">
          {/* Subtle decorative circles */}
          <div className="absolute top-10 right-10 w-96 h-96 bg-[#FEE2E2]/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-red-100/50 rounded-full blur-2xl pointer-events-none" />

          {/* Top Brand Pill */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E7EB] shadow-xs text-xs font-semibold text-[#C62828]">
              <span className="w-2 h-2 rounded-full bg-[#E53935] animate-pulse" />
              Official Portal — maanwin51.com
            </div>
          </div>

          {/* Center Showcase Content */}
          <div className="relative z-10 max-w-lg my-auto py-8">
            <h1 className="text-4xl xl:text-5xl font-extrabold text-[#111827] leading-[1.15] mb-6">
              Next-Generation <span className="text-[#E53935]">Secure</span> Account Platform
            </h1>
            <p className="text-base xl:text-lg text-[#6B7280] leading-relaxed mb-8">
              Experience fast, modern, and verified access designed with bank-grade session security and seamless single-click authorization.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-4">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/80 border border-[#E5E7EB] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#FFF5F5] text-[#E53935] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111827]">Secure Password Hashing</h4>
                  <p className="text-xs text-[#6B7280]">Advanced cryptographic password algorithms with zero plain-text storage.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/80 border border-[#E5E7EB] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#FFF5F5] text-[#E53935] flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111827]">Multi-Channel Verification</h4>
                  <p className="text-xs text-[#6B7280]">Flexible authentication via registered Indian & international mobile numbers or email.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/80 border border-[#E5E7EB] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#FFF5F5] text-[#E53935] flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111827]">Instant Automatic Login</h4>
                  <p className="text-xs text-[#6B7280]">Seamless onboarding with direct authenticated session creation upon registration.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Footer */}
          <div className="relative z-10 flex items-center gap-6 text-xs text-[#6B7280] pt-6 border-t border-[#E5E7EB]/60">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#16A34A]" /> 256-Bit SSL Protection
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" /> Brute-Force Rate Limiting
            </span>
          </div>
        </div>

        {/* Right Side: Authentication Form Card (Full width mobile, 50% desktop) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 xl:p-12">
          <div className="w-full max-w-[440px] sm:max-w-[460px] bg-white rounded-2xl sm:rounded-3xl border border-[#E5E7EB] shadow-xs p-6 sm:p-9 my-auto">
            {/* Header Titles */}
            <div className="text-center mb-6">
              <div className="inline-flex lg:hidden w-12 h-12 rounded-2xl bg-[#E53935] items-center justify-center text-white font-extrabold text-lg mb-4 shadow-sm">
                M51
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-2 text-sm text-[#6B7280] leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Form Slot */}
            {typeof children === 'function' ? children({ openLegalModal }) : children}

            {/* Clean Footer / Legal Links */}
            <div className="mt-6 pt-5 border-t border-[#F1F5F9] text-center text-xs text-[#9CA3AF]">
              <span>Protected by MaanWin51 Security &middot; </span>
              <button
                type="button"
                onClick={() => openLegalModal('privacy')}
                className="underline hover:text-[#111827] cursor-pointer"
              >
                Privacy
              </button>
              <span> &middot; </span>
              <button
                type="button"
                onClick={() => openLegalModal('terms')}
                className="underline hover:text-[#111827] cursor-pointer"
              >
                Terms
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Terms / Privacy Modal Dialog */}
      {modalContent && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-[#E5E7EB]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
              <h3 className="text-lg font-bold text-[#111827]">{modalContent.title}</h3>
              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-[#6B7280] cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-4 text-sm text-[#4B5563] leading-relaxed max-h-72 overflow-y-auto">
              {modalContent.text}
            </div>
            <div className="pt-4 border-t border-[#E5E7EB] flex justify-end">
              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="px-5 py-2.5 bg-[#E53935] hover:bg-[#C62828] text-white text-sm font-semibold rounded-xl cursor-pointer"
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
